import {StyleSheet, Text, TextProps, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "expo-router";
import {DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {ParamListBase} from "@react-navigation/native";

export type BrixDrawerToggleButtonProps = TouchableOpacityProps & {
    size?: number
}
export default function BrixDrawerToggleButton(props: BrixDrawerToggleButtonProps) {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();


    return (<>
        <TouchableOpacity style={props.style} onPress={() => navigation.openDrawer()}>
            <Feather name="menu" color="white" size={props.size ?? 32} />
        </TouchableOpacity>
    </>)
}
