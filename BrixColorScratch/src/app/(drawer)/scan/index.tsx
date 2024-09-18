import {TouchableOpacity, View} from "react-native";
import {Drawer} from "expo-router/drawer";
import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function Page() {
    const [flashOn, setFlash] = useState(false)
    const [preds, setPreds] = useState([])
    const [imageUri, setImageUri] = useState<string>(null);

    // const camera = useRef<Camera>(null)
    const handleFlashPress = () => {
        setFlash(!flashOn);
    };

    return (
        <View>
            <Drawer.Screen options={{headerShown: false}} />

            <View>
                {/* Opens and closes drawer */}
                {/*<BrixDrawerToggleButton*/}
                {/*    style={[{ marginLeft: 15 }]}*/}
                {/*    size={32}*/}
                {/*/>*/}

                {/* Help button */}
                <TouchableOpacity
                    style={[{ marginRight: 15 }]}
                    accessibilityLabel="Help"
                    accessibilityHint="Display useful instructions on how to use the application"
                    accessibilityRole="button"
                >
                    <FontAwesome
                        name="info-circle"
                        size={25}
                        color={'black'}
                        style={{ marginRight: 15, opacity: 0.5 }}
                    />
                </TouchableOpacity>
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
        flex: 3 / 8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        backgroundColor: "rgba(0,0,0,0.375)",
        marginTop: "auto",
    },
});