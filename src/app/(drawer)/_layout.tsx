import { Drawer } from "expo-router/drawer";
import { useState, useEffect } from "react";
import {TouchableOpacity, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import {Link, useRouter} from "expo-router";
import {SettingsProvider} from "@/components/SettingsContext";

function DrawerContent(props: DrawerContentComponentProps & { handleLogout: () => void; isLoggedIn: boolean }) {
    const router = useRouter();

    useEffect(() =>{
    // console.log(props.isLoggedIn)
    }, [props.isLoggedIn])

    return (
        <>
            <DrawerContentScrollView {...props}>
                <View style={{gap: 10}}>
                    <Link href="/scan/settings" asChild>
                        <TouchableOpacity style={{padding: 16}}>
                            <Text style={{fontSize: 16}}>Settings</Text>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity
                        onPress={() => {
                            // if logged in you will logout
                            if (props.isLoggedIn) {
                                props.handleLogout();
                            } else {
                                // if logged out, log in
                                router.push("/LoginPage");
                            }
                        }}
                    >
                        <Text style={{ textAlign: "center", fontSize: 20, color: "blue" }}>{props.isLoggedIn ? "Logout" : "Login"}</Text>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
        </>
    );
}

export default function DrawerLayout() {
    // State variables to track login state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);


    // Effect to check login status on component mount
    useEffect(() => {
        checkLoginStatus();
    }, []);

    // Function to check login status
    const checkLoginStatus = async () => {
        try {
            // Check if user is logged in by checking if there is saved data
            const userData = await AsyncStorage.getItem("uid");
            const loggedIn = userData !== null;
            setIsLoggedIn(loggedIn);
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    };

    // Function to handle logout
    const handleLogout = async () => {
        try {
            // Clear user data from AsyncStorage or perform other logout actions
            await AsyncStorage.removeItem("uid");
            setIsLoggedIn(false); // Update login state


        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Return null until the login state is calculated
    if (isLoggedIn === null) {
        return null;
    }

    return (
        <SettingsProvider>
            <Drawer
                screenOptions={{ headerShown: false, swipeEdgeWidth: 0 }}
                drawerContent={(props) => <DrawerContent {...props} handleLogout={handleLogout} isLoggedIn={isLoggedIn} />}
            >
                <Drawer.Screen
                    name="scan"
                    options={{
                        drawerLabel: "Scan",
                        headerShown: false,
                    }}
                />
            </Drawer>
        </SettingsProvider>
    );
}
