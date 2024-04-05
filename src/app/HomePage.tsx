import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import HelloWorld from "@/components/HelloWorld";
import Icons from "@icons";
import {SendIcon} from "@icons"
import {Link, Stack, useRouter} from "expo-router";
import ScanCamera from "@/components/ScanCamera";

export default function HomePage() {
    const router = useRouter()

    return (
        <View style={styles.container}>


            <ScanCamera/>

            <HelloWorld/>


            {/* Temp */}
            <Button title='Login' onPress={() => {router.push('/LoginPage')}}/>
            {/* <Link href='/LoginPage'>Login</Link> */}

            {/*Two ways of using the same component*/}
            <Icons.Send/>
            <SendIcon/>
            <StatusBar style="auto" />

            {/*Link that navigates to /settings*/}
            <Link href="/settings">Settings</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
