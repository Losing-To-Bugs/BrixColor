import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable } from 'react-native';
import ScanCamera from "@/components/ScanCamera";
import BrixText from "@/components/BrixText";

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={[buttons.placeholder, {marginLeft: 15}]}>
                    <BrixText>Open Menu</BrixText>
                </Pressable>

                <Pressable style={[buttons.placeholder, {marginRight: 15}]}>
                    <BrixText>Help</BrixText>
                </Pressable>
            </View>

            <ScanCamera style={styles.camera}>
                <View style={styles.control}>
                    <Pressable style={[buttons.placeholder]}>
                        <BrixText>Flash</BrixText>
                    </Pressable>

                    <Pressable style={[buttons.placeholder]}>
                        <BrixText>Shutter</BrixText>
                    </Pressable>

                    <Pressable style={[buttons.placeholder]}>
                        <BrixText>Open</BrixText>
                    </Pressable>
                </View>
            </ScanCamera>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'black',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },

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

const buttons = StyleSheet.create({
    placeholder: {
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 4,
        borderColor: 'white'
    }
})
