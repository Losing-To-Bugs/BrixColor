import {Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "expo-router";
import {DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {ParamListBase} from "@react-navigation/native";
import {useIconFonts} from "@/hooks/useIconFonts";
import IconCharacters from "@/constants/icon-characters";

export type BrixDrawerToggleButtonProps = TouchableOpacityProps & {
    size?: number
}
export default function BrixDrawerToggleButton(props: BrixDrawerToggleButtonProps) {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
    const [loaded] = useIconFonts();

    if (!loaded) return null;

    return (<>
        <TouchableOpacity style={props.style} onPress={() => navigation.openDrawer()}
                          accessibilityLabel="Open Menu"
                          accessibilityRole="button"

        >
            <Text style={{ fontFamily: 'Ionicons', fontSize: 32, color: 'white' }}>{IconCharacters.Menu}</Text>
        </TouchableOpacity>
    </>)
}
