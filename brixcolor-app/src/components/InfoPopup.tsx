import React, { useEffect, useState } from "react";
import {
    View,
    Modal,
    Text,
    Button,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { IMAGES } from "../constants/images";
import { legoColors } from "../constants/colors";
import { useSettings } from "./SettingsContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HISTORYURL, HISTORYKEY } from "@/constants/database-strings";
import AudioAnnounce from "@/components/AudioAnnounce"; 

export interface InfoPopupProps {
    confidence: number,
    brick: string,
    color: string,
    isShown: boolean,
    uid: string,
    handlePress: () => void
}

const InfoPopup: React.FC<InfoPopupProps> = ({ confidence, brick, color, isShown, uid, handlePress }) => {

    const {themes, theme, fontSizes, fontSize, toggleAudio} = useSettings();
    
    // Function to handle presenting the name and the type of brick
    const handleIdentity = () =>{
        let name = brick.split("_");
        let type  = (name.length > 1) ? "Plate" : "Brick"

        return `${name[0]} ${type}`
    }
    
    const handleAudioAnnounce = () => {
        if (toggleAudio) {
            const { speak } = AudioAnnounce(color, handleIdentity()); // Destructure to get the speak method
            speak(); // Trigger the speak method
        }
        else if (!toggleAudio) {
            console.log('Audio announcement is turned off.'); 
        }
     }

    useEffect(()=>{
        /** Function to update and store history */
        /** Added audio annoucement here - Josh */
        const saveData = async () =>{
            let dataObj = []
            const timestamp = new Date().getTime();
            const data = {
                uid: uid,
                color: color,
                label: brick,
                confidence: confidence,
                timestamp: timestamp
            }
            



            // get current history
            try{
                const rawData = await AsyncStorage.getItem(HISTORYKEY);
                dataObj = (rawData !== null) ? await JSON.parse(rawData) : []
            }
            catch(err){
                // possibly return error code
                console.error(err);
                // return -1;
            }

        
            try{
                dataObj.push(data);
            }
            catch(err){
                dataObj = [];
                dataObj.push(data);
            }
           

            // convert to string
            const dataStr = JSON.stringify(dataObj);

            
            // load the data
            try{
                await AsyncStorage.setItem("history", dataStr);
            }
            catch(err){
                // possibly return error code
                console.error(err);
                // return -1;
            }

            // don't save to database if not logged in
            if (uid.length < 1){
                return
            }
            console.log("Made it")

            const payload = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            // load into server db
            try{
                await fetch(HISTORYURL, payload);
            }
            catch(err){
                // possibly return error code
                console.error(err);
                // return -1;
            }

            // possibly return good status code
            // return 0;
        }

        saveData();
        handleAudioAnnounce();
    }, []);





  return (

    // outer container can be removed
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        // {/* <Button title="Show Modal" onPress={() => setIsShown(true)} /> */}

        // {/* beginning of Info Modal */}
        <Modal visible={isShown} transparent={true} animationType="fade" accessibilityLabel="Scanned Data Popup">

            {/* use touchable feedback to enable closing on press out */}
            <TouchableWithoutFeedback onPress={handlePress}>
            <View style={{ backgroundColor: "#00000016", flex: 1, justifyContent: "center", alignItems: "center" }}>
                
                {/* second touchable opacity voids presses within the active area by routing to empty callback */}
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={{ backgroundColor: themes[theme].primaryColor, width: "70%", height: "40%", borderRadius: 15, borderColor: "black", borderWidth: 1 }}>

                        {/* Close Button */}
                        <TouchableOpacity 
                            accessibilityLabel="Close Button"
                            accessibilityRole="button"
                            onPress={handlePress} 
                            style={{ position: "absolute", top: 10, right: 10, padding: 5, zIndex: 1, backgroundColor: themes[theme].backgroundColor, borderRadius: 5 }}
                            >
                            <Text style={{ fontWeight: "bold", color: themes[theme].textColor }}>X</Text>
                        </TouchableOpacity>


                        <View style={{flex: 1}} >
                            <View style={{flex: 1, alignItems: "center", paddingTop: 10}} >
                                <Text accessibilityLabel="Lego Match Confidence" style={{color: themes[theme].textColor, fontSize: Math.max(fontSizes[fontSize].fontSize - 4 , 12)}}>Confidence {Math.round(confidence * 100)}%</Text>
                            </View>
                            <View style={{flex: 3, justifyContent: "center", alignItems: "center"}} >
                                <Image source={IMAGES[brick]} style={{width: "60%", height: "70%", borderColor: "black", borderWidth: 1, borderRadius: 10}}/>
                            </View>
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
                                {color ? (
                                    <Text accessibilityLabel="Lego Description" style={{textAlign: "center", color: themes[theme].textColor, fontSize: fontSizes[fontSize].fontSize + 2}} >{color}</Text>
                                ) : (
                                    <ActivityIndicator size="large"/>
                                )}

                                <Text accessibilityLabel="Lego Description" style={{textAlign: "center", color: themes[theme].textColor, fontSize: fontSizes[fontSize].fontSize + 2}} >{handleIdentity()}</Text>

                            </View>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    // </View>
  );
};

export default InfoPopup;
