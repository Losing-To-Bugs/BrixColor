import {StyleSheet} from "react-native";

const pageStyles = StyleSheet.create({
    header: {
        height:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'black',
        paddingStart: 15,
        paddingEnd: 15
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
})

export default pageStyles