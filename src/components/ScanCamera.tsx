import {Button, Text, View} from "react-native";
import {Camera, CameraProps, CameraType, FlashMode} from "expo-camera";
import {forwardRef} from "react";

export type ScanCameraProps = CameraProps & {
    flashOn: boolean,
}

const ScanCamera = forwardRef(function (props: ScanCameraProps, ref) {
    const [permission, requestPermission] = Camera.useCameraPermissions()

    if (!permission) {
        return (<View>
        </View>)
    }

    if (!permission.granted) {
        return (<View style={props.style}>
            <Text>Please grant access to camera usage in app settings.</Text>
            <Button
                title="Request Permission"
                onPress={() => requestPermission()}
            />
        </View>)
    }

    return (<>
        <View style={[props.style, {backgroundColor: 'black'}]}>
            <Camera style={{width: '100%', height: '100%'}} type={CameraType.back} flashMode={props.flashOn ? FlashMode.torch : FlashMode.off} ref={ref}>
                {props.children}
            </Camera>
        </View>
    </>)
})

export default ScanCamera