import {Button, Text, View, StyleSheet} from "react-native";
import {CameraProps} from "expo-camera";
import {forwardRef, useEffect} from "react";
import {Camera, useCameraPermission, useCameraDevice, useFrameProcessor} from "react-native-vision-camera";

export type ScanCameraProps = CameraProps & {
    flashOn: boolean,
}

const VisionCamera = function (props: ScanCameraProps, ref) {
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()

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

    if(device == null){
        return (
            <Text>Camera was not found</Text>
        );
    }

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        const buffer = frame.toArrayBuffer();
        const data = new Uint8Array(buffer);
        const length = buffer.byteLength;

        let y = data[1036799]
        let u = data[3000000]
        let v = data[2332799]
        /*
        const r = y + 1.14 * v;
        const g = y - 0.395 * u - 0.581 * v;
        const b = y + 2.032 * u;
        */
        y -= 16;
        u -= 128;
        v -= 128;
        const r = 1.164 * y + 1.596 * v;
        const g = 1.164 * y - 0.392 * u - 0.813 * v;
        const b = 1.164 * y + 2.017 * u;

        // console.log(`YUV: ${y+16}, ${u+128}, ${v+128}`);
        // console.log(`RGB: ${r}, ${g}, ${b}`);
        // console.log(`${frame.height} ${frame.width}`);

    }, [])

    return (
        <>
            <Camera
                frameProcessor={frameProcessor}
                // style={StyleSheet.absoluteFill}
                style={{width: '100%', height: '100%'}}
                device={device}
                isActive={true}>
                <View>
                    <Text style={{color: 'Red'}}>Hey</Text>
                </View>
            </Camera>
        </>

    );
}

export default VisionCamera