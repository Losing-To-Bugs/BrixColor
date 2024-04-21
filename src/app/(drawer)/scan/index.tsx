import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScanCamera from "@/components/ScanCamera";
import pageStyles from "@/styles/page";
import buttonStyles from "@/styles/button";
import {Drawer} from "expo-router/drawer";
import {Feather, FontAwesome, Ionicons} from "@expo/vector-icons";
import {useRef, useState} from "react";
import BrixDrawerToggleButton from "@/components/BrixDrawerToggleButton";
import * as ImagePicker from 'expo-image-picker';
import {Camera, ImageType} from "expo-camera";
import inferenceApiUrl from "@/services/apiConfig";

async function predict(imageUri) {
    const url = inferenceApiUrl

    const localUri = imageUri;
    const formData = new FormData();
    formData.append("file", {uri: localUri, type: 'image/jpeg', name: 'brix.jpg'});

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'content-type': 'multipart/form-data',
        },
    })

    const {preds} = await response.json()
    return preds
}
export default function Page() {
    const [flashOn, setFlash] = useState(false)
    const [preds, setPreds] = useState([])

    const camera = useRef<Camera>(null)
    const handleFlashPress = () => {
        setFlash(!flashOn)
    }

    const handleImagePickPress = async () => {
        setPreds([])
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (result.canceled) {
            return
        }

        const preds = await predict(result.assets[0].uri).catch(console.error)

        setPreds(preds)
    }

    const handleShutter = async () => {
        setPreds([])
        const result = await camera.current.takePictureAsync({
            imageType: ImageType.jpg
        })

        const preds = await predict(result.uri).catch(console.error)
        setPreds(preds)
    }

    const Predictions = () => (<>
        <View style={{position: 'absolute'}}>
            {preds?.map((pred, i) => (<Text style={{fontSize: 24, color: 'white'}} key={i}>{pred}</Text>))}
        </View>
    </>)

    return (
        <View style={pageStyles.container}>
            <Drawer.Screen
                options={{
                    headerShown: false,
                }}
            />

            {/* Header */}
            <View style={pageStyles.header}>
                {/* Opens and closes drawer */}
                <BrixDrawerToggleButton style={[{marginLeft: 15}]} />

                {/* Help button */}
                <TouchableOpacity style={[{marginRight: 15}]}
                                  accessibilityLabel="Help"
                                  accessibilityHint="Display useful instructions on how to use the application"
                                  accessibilityRole="button">
                    <Feather name="help-circle" color="white" size={32} />
                </TouchableOpacity>
            </View>

            <ScanCamera style={styles.camera} flashOn={flashOn} ref={ref => {camera.current = ref}}>
                {preds && preds.length > 0 ? <Predictions/> : <></>}
                <View style={styles.control}>

                    {/* Shutter button */}
                    <TouchableOpacity onPress={handleShutter}
                                      style={buttonStyles.circle}
                                      accessibilityLabel="Shutter button"
                                      accessibilityHint="Takes photo to scan brick"
                                      accessibilityRole="button"/>

                    <View style={{flexDirection: 'row', gap: 30}}>
                        {/* Flash button */}
                        <TouchableOpacity onPress={handleFlashPress}
                                          accessibilityLabel="Toggle flash"
                                          accessibilityHint="Toggles the camera flash"
                                          accessibilityRole="togglebutton"
                                          accessibilityState={{checked: flashOn}}

                        >
                            {flashOn ? <Ionicons name="flash" color="white" size={32}/> : <Ionicons name="flash-off" color="white" size={32}/>}
                        </TouchableOpacity>

                        {/* Open photos button */}
                        <TouchableOpacity onPress={handleImagePickPress}
                                          accessibilityLabel="Open photos"
                                          accessibilityHint="Open photo album to choose picture to scan"
                                          accessibilityRole="button">
                            <FontAwesome name="photo" color="white" size={32} />
                        </TouchableOpacity>
                    </View>


                </View>
            </ScanCamera>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',

        fontWeight: 'bold',
        fontSize: 48,
        width: '100%',
    },

    control: {
        flex: 3/8,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        backgroundColor: 'rgba(0,0,0,0.375)',
        marginTop: 'auto'
    },
});
