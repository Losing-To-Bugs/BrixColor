import {Button, Text, View, StyleSheet} from "react-native";
import {CameraProps} from "expo-camera";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {
    Camera,
    useCameraPermission,
    useCameraDevice,
    useFrameProcessor,
    useCameraFormat, useSkiaFrameProcessor
} from "react-native-vision-camera";
import {Skia} from "@shopify/react-native-skia";
import {detectBrick} from "@/hooks/detectBrick";
import {useSharedValue} from "react-native-worklets-core";
import {CAMERA_FPS} from "@/constants/vision-constants";

export type ScanCameraProps = CameraProps & {
    flashOn: boolean,
}

type Rect = [number, number, number, number]
function IoU(box1: Rect, box2: Rect): number {
    'worklet';
    const [midX1, midY1, w1, h1] = box1
    const [midX2, midY2, w2, h2] = box2

    const minX1 = midX1 - w1/2
    const minX2 = midX2 - w2/2
    const minY1 = midY1 - h1/2
    const minY2 = midY2 - h2/2

    const maxX1 = midX1 + w1/2
    const maxX2 = midX2 + w2/2
    const maxY1 = midY1 + h1/2
    const maxY2 = midY2 + h2/2

    const inter_w = Math.min(maxX1, maxX2) - Math.max(minX1, minX2)
    const inter_h = Math.min(maxY1, maxY2) - Math.max(minY1, minY2)

    if (inter_w <= 0 || inter_h <= 0) return 0

    const inter = inter_w * inter_h

    const b1 = (maxX1 - minX1) * (maxY1 - minY1)
    const b2 = (maxX2 - minX2) * (maxY2 - minY2)

    const union = b1 + b2 - inter

    const iou = inter / union

    return iou
}

function getMaxPrediction(predictions: [number, number, number[]][]): [number, number, number[]] {
    'worklet'
    let maxScore = 0
    let maxIdx = 0

    for (let i = 0; i < predictions.length; i++) {
        const [label, score, rect] = predictions[i]

        if (score > maxScore) {
            maxScore = score
            maxIdx = i
        }
    }

    return [
        predictions[maxIdx][0],
        predictions[maxIdx][1],
        [
            predictions[maxIdx][2][0],
            predictions[maxIdx][2][1],
            predictions[maxIdx][2][2],
            predictions[maxIdx][2][3],
        ]
    ]
}

const VisionCamera = forwardRef(function (props: ScanCameraProps, ref) {
    const cameraRef = useRef(null)
    const trackingRef = useRef(null)
    useImperativeHandle(ref, () => ({
        cameraRef: cameraRef,
        trackingRef: trackingRef
    }))

    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    const [currentFrame, setCurrentFrame] = useState(null)
    const tracking = useSharedValue<any>(null)

    const format = useCameraFormat(device, [
        // { videoResolution: { width: 1152, height: 640 } },
        { videoResolution: {width: 1920, height: 1080} }
    ])
    const fps = CAMERA_FPS // <-- 240 FPS, or lower if 240 FPS is not available

    // Update tracking ref
    useEffect(() => {
        const interval = setInterval(() => {
            trackingRef.current = tracking.value
        }, 1000 / fps)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if(!hasPermission){
            requestPermission();
        }
    }, [hasPermission]);

    if(!hasPermission){
        return (
            <Text>Please enable camera permissions in settings</Text>
        );
    }



    const frameProcess = useFrameProcessor((frame) => {
        'worklet'

        const result = detectBrick(frame)

        if ((typeof result === 'object' && !Array.isArray(result)) || result?.length === 0) {
            if (tracking.value !== null) {
                let newScore = 0.8 * tracking.value.score
                tracking.value = {
                    x: tracking.value.x,
                    y: tracking.value.y,
                    width: tracking.value.width,
                    height: tracking.value.height,
                    score: newScore,
                    label: tracking.value.label
                }
            }
        } else {
            const [maxClass, maxScore, rect] = getMaxPrediction(result)

            if (maxScore < 0.7) {
                if (tracking.value !== null) {
                    let newScore = 0.8 * tracking.value.score
                    tracking.value = {
                        x: tracking.value.x,
                        y: tracking.value.y,
                        width: tracking.value.width,
                        height: tracking.value.height,
                        score: newScore,
                        label: tracking.value.label
                    }
                }
            } else {
                const [x, y, width, height] = rect

                if (tracking.value === null) {
                    tracking.value = {
                        x,
                        y,
                        width,
                        height,
                        score: 1,
                        label: maxClass
                    }
                } else {
                    const trackingRect = [tracking.value.x, tracking.value.y, tracking.value.width, tracking.value.height ]
                    const iou = IoU(trackingRect, rect)

                    let newScore = Math.min(1, 1 * tracking.value.score * (Math.min(iou, 0.75) + 0.5))

                    if (iou < 0.1) {
                        newScore = maxScore
                    }

                    tracking.value = {
                        x,
                        y,
                        width,
                        height,
                        score: newScore,
                        label: maxClass
                    }
                }
            }
        }

        if (tracking.value === null) {
            return
        }

        if (tracking.value.score < 0.1) {
            return
        }
        //
        // console.log(tracking.value)
        // if (result['error'] || result['conf'] < 0.7) {
        //     return
        // }

        // result['label'] = labelMap[result['cls']]
        // console.log(result)

        // const buffer = frame.toArrayBuffer();
        // const data = new Uint8Array(buffer);
        // const length = buffer.byteLength;
        //
        // let y = data[1036799]
        // let u = data[3000000]
        // let v = data[2332799]
        /*
        const r = y + 1.14 * v;
        const g = y - 0.395 * u - 0.581 * v;
        const b = y + 2.032 * u;
        */
        // y -= 16;
        // u -= 128;
        // v -= 128;
        // const r = 1.164 * y + 1.596 * v;
        // const g = 1.164 * y - 0.392 * u - 0.813 * v;
        // const b = 1.164 * y + 2.017 * u;

        // console.log(`YUV: ${y+16}, ${u+128}, ${v+128}`);
        // console.log(`RGB: ${r}, ${g}, ${b}`);
        // console.log(`${frame.height} ${frame.width}`);
    }, [tracking])


    const frameProcessor = useSkiaFrameProcessor((frame) => {
        'worklet'

        const result = detectBrick(frame)

        const hScale = frame.height / 640
        const wScale = frame.width / 640

        if ((typeof result === 'object' && !Array.isArray(result)) || result?.length === 0) {
            if (tracking.value !== null) {
                let newScore = 0.8 * tracking.value.score
                tracking.value = {
                    x: tracking.value.x,
                    y: tracking.value.y,
                    width: tracking.value.width,
                    height: tracking.value.height,
                    score: newScore,
                    label: tracking.value.label
                }
            }
        } else {
            const [maxClass, maxScore, rect] = getMaxPrediction(result)

            if (maxScore < 0.7) {
                if (tracking.value !== null) {
                    let newScore = 0.8 * tracking.value.score
                    tracking.value = {
                        x: tracking.value.x,
                        y: tracking.value.y,
                        width: tracking.value.width,
                        height: tracking.value.height,
                        score: newScore,
                        label: tracking.value.label
                    }
                }
            } else {
                const [x, y, width, height] = rect

                if (tracking.value === null) {
                    tracking.value = {
                        x,
                        y,
                        width,
                        height,
                        score: maxScore,
                        label: maxClass
                    }
                } else {
                    const trackingRect = [tracking.value.x, tracking.value.y, tracking.value.width, tracking.value.height ]
                    const iou = IoU(trackingRect, rect)

                    let newScore = Math.min(1, 1 * tracking.value.score * (Math.min(iou, 0.75) + 0.5))

                    if (iou < 0.1) {
                        newScore = maxScore
                    }

                    tracking.value = {
                        x,
                        y,
                        width,
                        height,
                        score: newScore,
                        label: maxClass
                    }
                }
            }
        }

        if (tracking.value === null) {
            frame.render()
            return
        }

        if (tracking.value.score < 0.1) {
            frame.render()
            return
        }

        const {x, y, width, height} = tracking.value

        // Mid x, mid y, width, height
        const newRect = Skia.XYWHRect((x + width/2) * wScale, (y - height/2) * hScale, -width * wScale, height * hScale)
        const paint = Skia.Paint()
        paint.setColor(Skia.Color('rgba(255,0,0,0.18)'))

        frame.render()
        frame.drawRect(newRect, paint)

    }, [])

    if(device == null){
        return (
            <>
                <View style={[props.style, {backgroundColor: 'black'}]}>
                    <Text style={{color: 'white'}}>Camera not found on this device</Text>
                    {props.children}
                </View>
            </>
        );
    }

    return (
        <>
            <View style={[props.style, {backgroundColor: 'black'}]}>
                <Camera

                    ref={cameraRef}
                    frameProcessor={frameProcess}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    torch={props.flashOn ? 'on' : 'off'}
                    photo={true}
                    isActive={true}
                    enableZoomGesture={true}
                    format={format}
                    pixelFormat={"rgb"}
                    resizeMode={"contain"}
                    preview={true}
                    fps={fps}
                >

                </Camera>
                {props.children}
            </View>
        </>

    );
});

export default VisionCamera