import { Redirect } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SettingsProvider } from "@/components/SettingsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

function App() {
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [UID, setUID] = useState("");

    // if saved data exists, the user is logged in
    useEffect(() => {
        const updateLoginStatus = async () => {
            try {
                const value = await AsyncStorage.getItem("uid");
                if (value !== null) {
                    setUID(value);
                    setRedirectUrl("/(drawer)/scan");
                } else {
                    setRedirectUrl("/LoginPage");
                }
            } catch (e) {
                console.error(e);
            }
        };

        updateLoginStatus();

        // uncomment to logout
        // const meh = async () =>{
        //   try {
        //     await AsyncStorage.removeItem('uid')
        //   } catch(e) {
        //     // remove error
        //   }
        // }

        // meh();
    }, []);

    if (redirectUrl) {
        return <Redirect href={redirectUrl} />;
    }

    // Return null while redirect URL is being determined
    return null;
}

export default () => {
    return (
        <SettingsProvider>
            <App />
        </SettingsProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
