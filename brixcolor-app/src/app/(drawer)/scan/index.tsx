import {Text, TouchableOpacity, View, Platform} from "react-native";
import {Drawer} from "expo-router/drawer";
import React, {useRef, useState, useEffect} from "react";
import {StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScanCamera from "@/components/ScanCamera";
import pageStyles from "@/styles/page";
import buttonStyles from "@/styles/button";
import BrixDrawerToggleButton from "@/components/BrixDrawerToggleButton";
import * as ImagePicker from "expo-image-picker";
import VisionCamera from "@/components/VisionCamera";
import Constants from 'expo-constants'
import {useSettings} from "@/components/SettingsContext";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Camera} from "react-native-vision-camera";
import {Camera as ExpoCamera} from "expo-camera";
import {usePermissions} from "expo-media-library";
import {CAMERA_FPS, LABEL_MAP} from "@/constants/vision-constants";


const isRunningInExpoGo = Constants.appOwnership === 'expo'

function Page() {
    const runExpoCamera = isRunningInExpoGo || Platform.OS === 'web';

    const [flashOn, setFlash] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [imageUri, setImageUri] = useState<string>(null);
    const [isOnboarded, setIsOnboarded] = useState(null);
    const [permissionResponse, requestPermission] = usePermissions()
    const [trackedLabel, setTrackedLabel] = useState('')

    const router = useRouter();
    const openOnboarding = () => {
        router.push('/onboard');
      };

      //Check if user has been onBoarded
      const checkOnboarding = async () => {
        const onboardingStatus = await AsyncStorage.getItem('isOnboarded');
        const onboarded = onboardingStatus === 'true';
        setIsOnboarded(onboarded);

        // Navigates to onboarding page if not yet onboarded
        if (!onboarded) {
            openOnboarding();
        }
    };

      useEffect(() => {
        checkOnboarding();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const trackingObject = inputRef?.current?.trackingRef?.current

            if (trackingObject == null || trackingObject.score < 0.3) {
               setTrackedLabel('')
            } else if (trackingObject) {
                const labelName = LABEL_MAP[trackingObject.label]
                setTrackedLabel(`Possible detection: ${labelName}`)
            }

        }, 1000 / CAMERA_FPS)

        return () => clearInterval(interval)
    }, [])


    const camera = useRef<ExpoCamera>(null)
    const nativeCamera = useRef<Camera>(null)
    const inputRef = useRef(null)

    useEffect(() => {
        console.log(`Running in Expo Go: ${isRunningInExpoGo}`)
        console.log(`Platform: ${Platform.OS}`)
        }, [isRunningInExpoGo, Platform.OS]);

    const handleShutterPress = async () => {
        if (!runExpoCamera && inputRef?.current.cameraRef?.current) {
            if (permissionResponse.status !== 'granted') {
                await requestPermission();
            }
        }
    }

    const handleFlashPress = () => {
        setFlash(!flashOn);
    };

    const handleImagePickPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (result.canceled) {
            return
        }

        setImageUri(result.assets[0].uri);
    }

    const {
        iconSize,
        iconSizes,
    } = useSettings();

    const iconSetSize: number = iconSizes[iconSize].Size ?? 32

    return (

        <View style={pageStyles.container}>
            <Drawer.Screen options={{headerShown: false}} />

            <View style={pageStyles.header }>
                <BrixDrawerToggleButton
                />

                {/*Real time lego detection info*/}
                <Text style={{color: 'white'}}>
                    {trackedLabel}
                </Text>

                {/* Help button */}
                <TouchableOpacity
                    onPress={openOnboarding}
                    accessibilityLabel="Help"
                    accessibilityHint="Display useful instructions on how to use the application"
                    accessibilityRole="button"
                >
                    <Ionicons
                        name="help-circle"
                        size={iconSetSize}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <View style={{
                flex: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                {
                    runExpoCamera ?
                        (<View style={{height: '100%', width: '100%'}}>
                            <ScanCamera flashOn={flashOn} style={styles.camera} ref={camera} />
                            <Text style={{color: 'white'}}>Using Expo Camera</Text>
                        </View>)
                        :
                        (<View style={{height: '100%', width: '100%'}}>
                            {/*Uncomment the line below to enable VisionCamera in a development build. Does not work in Expo Go*/}
                            {/*<VisionCamera flashOn={flashOn} style={styles.camera} ref={inputRef} />*/}
                            <Text style={{color: 'white'}}>Using React Vision Camera</Text>
                        </View>)

                }

                <View style={styles.control}>

                    {/* Shutter button */}
                    <TouchableOpacity onPress={handleShutterPress}
                                      style={buttonStyles.circle}
                                      accessibilityLabel="Shutter button"
                                      accessibilityHint="Takes photo to scan brick"
                                      accessibilityRole="button"/>

                    <View style={{ flexDirection: "row", gap: 30 }}>
                        {/* Flash button */}
                        <TouchableOpacity
                            onPress={handleFlashPress}
                            accessibilityLabel="Toggle flash"
                            accessibilityHint="Toggles the camera flash"
                            accessibilityRole="togglebutton"
                            accessibilityState={{ checked: flashOn }}
                        >
                            {flashOn ? (
                                <Ionicons
                                    name="flash"
                                    size={iconSetSize}
                                    color={'white'}
                                />
                            ) : (
                                <Ionicons
                                    name="flash-off"
                                    size={iconSetSize}
                                    color={'white'}
                                />
                            )}
                        </TouchableOpacity>

                        {/* Open photos button */}
                        <TouchableOpacity
                            onPress={handleImagePickPress}
                            accessibilityLabel="Open photos"
                            accessibilityHint="Open photo album to choose picture to scan"
                            accessibilityRole="button"
                        >
                            <Ionicons
                                name="images"
                                size={iconSetSize}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


            <StatusBar style="auto" />
        </View>
    )
}

export default function () {
    return <Page />
}
const styles = StyleSheet.create({
    camera: {
        flex: 10,
        alignItems: "center",
        justifyContent: "center",

        fontWeight: "bold",
        fontSize: 48,
        width: "100%",
    },

    control: {
        position: 'absolute',
        // alignSelf: 'flex-end',
        bottom: 0,

        width: '100%',
        height: '37.5%',

        // flex: 3 / 8,
        // flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        backgroundColor: "rgba(0,0,0,0.375)",
        marginTop: "auto",
    },
});