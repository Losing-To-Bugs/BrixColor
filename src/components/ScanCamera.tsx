import {Button, StyleSheet, Text, View} from "react-native";
import {Camera, CameraType} from "expo-camera";

export default function ScanCamera() {
    const [permission, requestPermission] = Camera.useCameraPermissions()

    if (!permission) {
        return (<View>
        </View>)
    }

    if (!permission.granted) {
        return (<View>
            <Text>Please grant access to camera usage in app settings.</Text>
            <Button
                title="Request Permission"
                onPress={() => requestPermission()}
            />
        </View>)
    }

    return (<>
        <View style={styles.container}>
            <Camera style={styles.camera} type={CameraType.back}>
                <View>

                </View>
            </Camera>
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '50%',
    },

    camera: {
        flex: 1
    }
})