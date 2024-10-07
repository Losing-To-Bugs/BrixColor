import {Button, Text, View, StyleSheet} from "react-native";
import {CameraProps} from "expo-camera";
import {forwardRef, useEffect, useState} from "react";
import {
    Camera,
    useCameraPermission,
    useCameraDevice,
    useFrameProcessor,
    useCameraFormat, useSkiaFrameProcessor
} from "react-native-vision-camera";
import {foo} from "@/hooks/foo";
import {Skia} from "@shopify/react-native-skia";
import {detectBrick} from "@/hooks/detectBrick";

export type ScanCameraProps = CameraProps & {
    flashOn: boolean,
}

const VisionCamera = forwardRef(function (props: ScanCameraProps, ref) {
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    const [currentFrame, setCurrentFrame] = useState(null)

    const format = useCameraFormat(device, [
        // { videoResolution: { width: 1152, height: 640 } },
        { videoResolution: {width: 1920, height: 1080} }
    ])
    const fps = 24 // <-- 240 FPS, or lower if 240 FPS is not available


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

    const labelMap = {0: '1x3', 1: '1x4', 2: '2x1', 3: '2x2', 4: '2x2_thin', 5: '2x3_thin', 6: '2x4', 7: '2x4_thin', 8: '2x6', 9: '2x6_thin', 10: '2x8', 11: '2x8_thin'}


    const frameProcess = useFrameProcessor((frame) => {
        'worklet'

        const result = detectBrick(frame)

        console.log(result)
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
    }, [])


    const frameProcessor = useSkiaFrameProcessor((frame) => {
        'worklet'

        const result = detectBrick(frame)

        const wScale = frame.height / frame.width
        // frame.scale(wScale, 1)

        if (result['error'] || result['conf'] < 0.7) {
            frame.render()
            return
        }

        if (result['conf'] < 0.7) {
            frame.render()
            return
        }

        result['label'] = labelMap[result['cls']]
        console.log('skia', result)

        const centerX = result['x'] * frame.width
        const centerY = result['y'] * frame.height
        const width = result['w'] * frame.width
        const height = result['h'] * frame.height

        console.log({centerX, centerY, width, height}, frame.width, frame.height, frame.orientation)


        // const rect = Skia.XYWHRect(1024, 364, (frame.width / frame.height)*100, 100)
        const rect = Skia.XYWHRect(centerX - 1.2*(width/2), centerY + 1.2*(height/2), width, height)
        // const rect = Skia.XYWHRect(frame.width/2, frame.height/2, 100, 100)
        // const rect = Skia.XYWHRect(centerX, centerY, width, height)

        const paint = Skia.Paint()
        paint.setColor(Skia.Color('rgba(255,0,0,0.18)'))

        frame.render()
        frame.drawRect(rect, paint)

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

                    ref={ref}
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