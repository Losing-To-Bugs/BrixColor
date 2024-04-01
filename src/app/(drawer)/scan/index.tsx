import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import ScanCamera from "@/components/ScanCamera";
import pageStyles from "@/styles/page";
import buttonStyles from "@/styles/button";
import {Drawer} from "expo-router/drawer";
import {Feather, FontAwesome, Ionicons} from "@expo/vector-icons";
import {useState} from "react";
import {useNavigation} from "expo-router";
import {DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {ParamListBase} from "@react-navigation/native";

export default function Page() {
    const [flashOn, setFlash] = useState(false)
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    return (
        <View style={pageStyles.container}>
            <Drawer.Screen
                options={{
                    headerShown: false,
                }}
            />


            <View style={pageStyles.header}>
                <TouchableOpacity style={[{marginLeft: 15}]} onPress={() => navigation.openDrawer()}>
                    <Feather name="menu" color="white" size={32} />
                </TouchableOpacity>

                <TouchableOpacity style={[{marginRight: 15}]}>
                    <Feather name="help-circle" color="white" size={32} />
                </TouchableOpacity>
            </View>

            <ScanCamera style={styles.camera} flashOn={flashOn}>
                <View style={styles.control}>
                    <TouchableOpacity style={buttonStyles.circle} />
                    <View style={{flexDirection: 'row', gap: 30}}>
                        <TouchableOpacity onPress={() => setFlash(!flashOn)}>
                            {flashOn ? <Ionicons name="flash" color="white" size={32}/> : <Ionicons name="flash-off" color="white" size={32}/>}
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <FontAwesome name="photo" color="white" size={32} />
                        </TouchableOpacity>
                    </View>


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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        backgroundColor: 'rgba(0,0,0,0.375)',
        marginTop: 'auto'
    },
});
