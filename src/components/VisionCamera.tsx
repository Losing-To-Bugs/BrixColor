import {Text, View, StyleSheet} from "react-native";
import {CameraProps} from "expo-camera";
import {forwardRef, useEffect, useState} from "react";
import {Camera, useCameraPermission, useCameraDevice, useFrameProcessor} from "react-native-vision-camera";
import { useSharedValue } from "react-native-worklets-core";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import buttonStyles from "@/styles/button";
import {useSettings} from "@/components/SettingsContext";
import { buildLegoColorTree, BuildLegoHashMap, getLegoColorName } from "@/app/scripts/colorHashMap";

export type ScanCameraProps = CameraProps & {
    flashOn: boolean,
    r, g, b,
    setR, setG, setB,
    imagePicker, setLegoName
}



const VisionCamera = function (props: ScanCameraProps, ref) {

    const LegoMap = BuildLegoHashMap();
    const ColorTree = buildLegoColorTree(LegoMap);

    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()

    let colors = useSharedValue([]);

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

    const {
        iconSize,
        iconSizes,
    } = useSettings();

    const iconSetSize: number = iconSizes[iconSize].iconSize ?? 32

    

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
            <></>
        );
    }

    const getCurrentColor = function () {
        props.setR(colors.value[0]);
        props.setG(colors.value[1]);
        props.setB(colors.value[2]);
        console.log(`RGBA: ${colors.value[0]}, ${colors.value[1]}, ${colors.value[2]}`)
        props.setLegoName(getLegoColorName(colors.value[0],colors.value[1],colors.value[2], LegoMap, ColorTree));
    }

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        const buffer = frame.toArrayBuffer();
        const data = new Uint8Array(buffer);
        const length = buffer.byteLength;

        let pixelStart = ((((frame.width * frame.height) / 2) - (frame.width / 2)) * 4) - 1
        //let a = data[pixelStart]
        let b = data[pixelStart - 3]
        let g  = data[pixelStart - 2]
        let r  = data[pixelStart - 1]
        
        //console.log(`RGBA: ${r}, ${g}, ${b}, ${a}`)

        colors.value = [r,g,b];

        /*
        console.log(`YUV: ${y+16}, ${u+128}, ${v+128}`);
        console.log(`RGB: ${r}, ${g}, ${b}`);
        console.log(`${frame.height} ${frame.width}`);
        */
    }, [colors])

    return (
        <>
            <View style={[props.style, {backgroundColor: 'black'}]}>
                <Camera
                    frameProcessor={frameProcessor}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    torch={props.flashOn ? 'on' : 'off'}
                    pixelFormat = "rgb"
                    isActive={true}>

                </Camera>
                
                
                <View style={styles.control}>

                    {/* Shutter button */}
                    <TouchableOpacity onPress={getCurrentColor}
                                      style={buttonStyles.circle}
                                      accessibilityLabel="Shutter button"
                                      accessibilityHint="Takes photo to scan brick"
                                      accessibilityRole="button"/>

                    <View style={{ flexDirection: "row", gap: 30 }}>
                        {/* Flash button */}
                        <TouchableOpacity
                            onPress={() => {props.flashOn = !props.flashOn}}
                            accessibilityLabel="Toggle flash"
                            accessibilityHint="Toggles the camera flash"
                            accessibilityRole="togglebutton"
                            accessibilityState={{ checked: props.flashOn }}
                        >
                            {props.flashOn ? (
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
                            onPress={props.imagePicker}
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
            
                {props.children}
            </View>
        </>

    );
}

export default VisionCamera