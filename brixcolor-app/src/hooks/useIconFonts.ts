import {useFonts} from "expo-font";

export function useIconFonts(): [boolean, Error] {
    return useFonts({
        Ionicons: require('assets/fonts/Ionicons.ttf'),
        Feather: require('assets/fonts/Feather.ttf'),
        FontAwesome: require('assets/fonts/FontAwesome.ttf'),
    });
}