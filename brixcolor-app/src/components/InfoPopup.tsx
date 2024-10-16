import { useState } from "react";
import { View, Modal, Text, Button, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import { IMAGES } from "../constants/images";
import { legoColors } from "../constants/colors";
import { useSettings } from "./SettingsContext";
import { SettingsProvider } from "./SettingsContext";

// TODO [] integrate with the scan page
// TODO [] save the scans to local storage
// TODO [] save the scans (and settings) to the database


const InfoPopup = ({ data }) => {

    // Use state to handle toggling view
    const [isShown, setIsShown] = useState(false);

    const {themes, theme, fontSizes, fontSize} = useSettings();
    
    // Function to handle presenting the name and the type of brick
    const handleIdentity = () =>{
        let name = data.brick.split("_");
        let type  = (name.length > 1) ? "Plate" : "Brick"

        return `${name[0]} ${type}`
    }

    const getCurrentTime = () =>{
       console.log(new Date().getTime())
    }



  return (

    // outer container can be removed
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Show Modal" onPress={() => setIsShown(true)} />

        {/* beginning of Info Modal */}
        <Modal visible={isShown} transparent={true} animationType="fade" accessibilityLabel="Scanned Data Popup">

            {/* use touchable feedback to enable closing on press out */}
            <TouchableWithoutFeedback onPress={() => setIsShown(false)}>
            <View style={{ backgroundColor: "#00000016", flex: 1, justifyContent: "center", alignItems: "center" }}>
                
                {/* second touchable opacity voids presses within the active area by routing to empty callback */}
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={{ backgroundColor: themes[theme].primaryColor, width: "70%", height: "40%", borderRadius: 15, borderColor: "black", borderWidth: 1 }}>

                        {/* Close Button */}
                        <TouchableOpacity 
                            accessibilityLabel="Close Button"
                            accessibilityRole="button"
                            onPress={() => setIsShown(false)} 
                            style={{ position: "absolute", top: 10, right: 10, padding: 5, zIndex: 1, backgroundColor: themes[theme].secondaryColor, borderRadius: 5 }}
                            >
                            <Text style={{ fontWeight: "bold", color: themes[theme].textColor }}>X</Text>
                        </TouchableOpacity>


                        <View style={{flex: 1}} >
                            <View style={{flex: 1, alignItems: "center", paddingTop: 10}} >
                                <Text style={{color: themes[theme].textColor, fontSize: Math.max(fontSizes[fontSize].fontSize - 4 , 12)}} accessibilityLabel="Lego Match Confidence">Confidence {data.confidence}%</Text>
                            </View>
                            <View style={{flex: 3, justifyContent: "center", alignItems: "center"}} >
                                <Image accessibilityLabel="Lego Match Confidence" source={IMAGES[data.brick]} style={{width: "60%", height: "70%", borderColor: "black", borderWidth: 1, borderRadius: 10}}/>
                            </View>
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
                                <Text accessibilityLabel="" style={{textAlign: "center", color: themes[theme].textColor, fontSize: fontSizes[fontSize].fontSize + 2}} >{legoColors[data.color]}{"\n"}{handleIdentity()}</Text>
                            </View>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </View>
  );
};

export default InfoPopup;
