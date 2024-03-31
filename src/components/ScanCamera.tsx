import {Button, Text, View, ViewProps} from "react-native";
import {Camera, CameraType} from "expo-camera";

export default function ScanCamera(props: ViewProps) {
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
            <Camera style={{width: '100%', height: '100%'}} type={CameraType.back}>
                {props.children}
            </Camera>
        </View>
    </>)
}
