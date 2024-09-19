import {TouchableOpacity, View} from "react-native";
import {Drawer} from "expo-router/drawer";
import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScanCamera from "@/components/ScanCamera";
import pageStyles from "@/styles/page";
import buttonStyles from "@/styles/button";
import BrixDrawerToggleButton from "@/components/BrixDrawerToggleButton";

function Page() {
    const [flashOn, setFlash] = useState(false)

    // const camera = useRef<Camera>(null)
    const handleFlashPress = () => {
        setFlash(!flashOn);
    };

    return (
        <View style={pageStyles.container}>
            <Drawer.Screen options={{headerShown: false}} />

            <View style={pageStyles.header}>
                <BrixDrawerToggleButton
                    size={32}
                />

                {/* Help button */}
                <TouchableOpacity
                    accessibilityLabel="Help"
                    accessibilityHint="Display useful instructions on how to use the application"
                    accessibilityRole="button"
                >
                    <Ionicons
                        name="help-circle"
                        size={32}
                        color="white"
                    />
                </TouchableOpacity>
            </View>


            <ScanCamera style={styles.camera} flashOn={flashOn}>
                <View style={styles.control}>

                    {/* Shutter button */}
                    <TouchableOpacity onPress={() => {}}
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
                                    size={32}
                                    color={'white'}
                                />
                            ) : (
                                <Ionicons
                                    name="flash-off"
                                    size={32}
                                    color={'white'}
                                />
                            )}
                        </TouchableOpacity>

                        {/* Open photos button */}
                        <TouchableOpacity
                            onPress={() => {}}
                            accessibilityLabel="Open photos"
                            accessibilityHint="Open photo album to choose picture to scan"
                            accessibilityRole="button"
                        >
                            {/*<Text style={{ fontFamily: 'Ionicons', fontSize: iconSizes[iconSize].Size, color: 'white' }}>{IconCharacters.Images}</Text>*/}
                            <Ionicons
                                name="images"
                                size={32}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScanCamera>


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
        flex: 3 / 8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        backgroundColor: "rgba(0,0,0,0.375)",
        marginTop: "auto",
    },
});