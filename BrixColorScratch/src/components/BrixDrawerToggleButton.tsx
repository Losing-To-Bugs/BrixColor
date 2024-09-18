import {Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {Feather} from "@expo/vector-icons";
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
            {/*<Text style={{ fontFamily: 'Ionicons', fontSize: 32, color: 'white' }}>{IconCharacters.Menu}</Text>*/}
            <Ionicons
                name="reorder-three-outline"
                size={32}
                color={'white'}
            />
        </TouchableOpacity>
    </>)
}
