import { useState } from "react";
import { View, Modal, Text, Button, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import { IMAGES } from "../constants/images";
import { legoColors } from "../constants/colors";

// TODO [] integrate with the scan page
// TODO [] save the scans to local storage
// TODO [] save the scans (and settings) to the database
// TODO [] use the font settings from the setting


const InfoPopup = ({ data }) => {

    // Use state to handle toggling view
    const [isShown, setIsShown] = useState(false);
    
    // Function to handle presenting the name and the type of brick
    const handleIdentity = () =>{
        let name = data.brick.split("_");
        let type  = (name.length > 1) ? "Plate" : "Brick"

        return `${name[0]} ${type}`
    }



  return (

    // outer container can be removed
    <View style={{ flex: 1, backgroundColor: "red", justifyContent: "center", alignItems: "center" }}>
        <Button title="Show Modal" onPress={() => setIsShown(true)} />

        {/* beginning of Info Modal */}
        <Modal visible={isShown} transparent={true} animationType="fade">

            {/* use touchable feedback to enable closing on press out */}
            <TouchableWithoutFeedback onPress={() => setIsShown(false)}>
            <View style={{ backgroundColor: "#00000016", flex: 1, justifyContent: "center", alignItems: "center" }}>
                
                {/* second touchable opacity voids presses within the active area by routing to empty callback */}
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={{ backgroundColor: "white", width: "70%", height: "40%", borderRadius: 15, borderColor: "black", borderWidth: 1 }}>

                        {/* Close Button */}
                        <TouchableOpacity 
                            onPress={() => setIsShown(false)} 
                            style={{ position: "absolute", top: 10, right: 10, padding: 5, zIndex: 1, backgroundColor: "lightgray", borderRadius: 5 }}
                            >
                            <Text style={{ fontWeight: "bold" }}>X</Text>
                        </TouchableOpacity>


                        <View style={{flex: 1}} >
                            <View style={{flex: 1, alignItems: "center", paddingTop: 10}} >
                                <Text>Confidence {data.confidence}%</Text>
                            </View>
                            <View style={{flex: 3, justifyContent: "center", alignItems: "center"}} >
                                <Image source={IMAGES[data.brick]} style={{width: "60%", height: "70%", borderColor: "black", borderWidth: 1, borderRadius: 10}}/>
                            </View>
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
                                <Text style={{textAlign: "center"}} >{legoColors[data.color]}{"\n"}{handleIdentity()}</Text>
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
