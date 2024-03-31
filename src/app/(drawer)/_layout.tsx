import {Drawer} from "expo-router/drawer";

export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={{ headerShown: false, swipeEdgeWidth: 0}}
        >

            <Drawer.Screen
                name="scan"
                options={{
                    drawerLabel: "Scan",
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: "Settings",
                    title: 'Settings',
                    headerShown: true,
                }}
            />

        </Drawer>
    );
}