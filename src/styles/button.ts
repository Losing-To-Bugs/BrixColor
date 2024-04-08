import {StyleSheet} from "react-native";

const buttonStyles = StyleSheet.create({
    placeholder: {
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 4,
        borderColor: 'white'
    },

    circle: {
        width: 70, // Diameter = 2 * radius
        height: 70, // Diameter = 2 * radius
        borderRadius: 35, // Radius of the circle
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default buttonStyles