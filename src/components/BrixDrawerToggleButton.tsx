import {TouchableOpacity, TouchableOpacityProps} from "react-native";
import {useNavigation} from "expo-router";
import {DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {ParamListBase} from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export type BrixDrawerToggleButtonProps = TouchableOpacityProps & {
    size?: number
}
export default function BrixDrawerToggleButton(props: BrixDrawerToggleButtonProps) {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    return (<>
        <TouchableOpacity style={props.style} onPress={() => navigation.openDrawer()}
                          accessibilityLabel="Open Menu"
                          accessibilityRole="button"

        >
            <Ionicons
                name="reorder-three-outline"
                size={32}
                color={'white'}
            />
        </TouchableOpacity>
    </>)
}
