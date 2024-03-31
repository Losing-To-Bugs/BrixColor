import {View} from "react-native";
import BrixText from "@/components/BrixText";
import pageStyles from "@/styles/page";
import {Drawer} from "expo-router/drawer";

export default function Settings() {
    return (<View style={pageStyles.container}>
        <Drawer.Screen
            options={{
                headerShown: false,
            }}
        />
        <BrixText>Settings</BrixText>
    </View>)
}