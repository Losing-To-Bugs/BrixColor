import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable } from 'react-native';
import ScanCamera from "@/components/ScanCamera";
import BrixText from "@/components/BrixText";
import pageStyles from "@/styles/page";
import buttonStyles from "@/styles/button";
import { DrawerToggleButton } from "@react-navigation/drawer";
import {Drawer} from "expo-router/drawer";

export default function Page() {
    return (
        <View style={pageStyles.container}>
            <Drawer.Screen
                options={{
                    headerShown: false,
                }}
            />

            <View style={pageStyles.header}>
                <DrawerToggleButton/>

                <Pressable style={[buttonStyles.placeholder, {marginRight: 15}]}>
                    <BrixText>Help</BrixText>
                </Pressable>
            </View>

            <ScanCamera style={styles.camera}>
                <View style={styles.control}>
                    <Pressable style={[buttonStyles.placeholder]}>
                        <BrixText>Flash</BrixText>
                    </Pressable>

                    <Pressable style={[buttonStyles.placeholder]}>
                        <BrixText>Shutter</BrixText>
                    </Pressable>

                    <Pressable style={[buttonStyles.placeholder]}>
                        <BrixText>Open</BrixText>
                    </Pressable>
                </View>
            </ScanCamera>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',

        fontWeight: 'bold',
        fontSize: 48,
        width: '100%',
    },

    control: {
        flex: 3/8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        backgroundColor: 'rgba(0,0,0,0.375)',
        marginTop: 'auto'
    },
});
