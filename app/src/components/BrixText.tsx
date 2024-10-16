import {StyleSheet, Text, TextProps} from "react-native";

export default function BrixText(props: TextProps) {
    return (<>
            <Text style={[styles.brixText, props.style]}>{props.children}</Text>
    </>)
}

const styles = StyleSheet.create({
    brixText: {
        fontWeight: 'bold',
        color: 'white',
    }
})