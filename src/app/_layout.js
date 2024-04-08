import React from "react";
import { Stack } from 'expo-router'

// handles pre-rendering for any fonts or anything like that, and initiallizing the stack
const Layout = () =>{
    return(
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    )
}
export default Layout;