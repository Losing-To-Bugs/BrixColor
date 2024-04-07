import { StatusBar } from 'expo-status-bar';
import {useState} from 'react'
import { StyleSheet, View, Button, Text } from 'react-native';
import HelloWorld from "@/components/HelloWorld";
import Icons from "@icons";
import {SendIcon} from "@icons"
import {Link, Stack, useRouter} from "expo-router";
import ScanCamera from "@/components/ScanCamera";
import React from 'react';

export default function HomePage() {
    const router = useRouter()
    const [name, setName] = useState("")

    // will need a global fix for this
    // const updateName = (newName: string) =>{
    //     setName(newName)
    // }

    return (
        <View style={styles.container}>


            <ScanCamera/>

            <HelloWorld/>
           {(name.length > 0 ) && <Text>{`Hello ${name}!`}</Text>}


            {/* Temp */}
            <Button title='Login' onPress={() => {router.push({pathname: '/LoginPage', })}}/>
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
