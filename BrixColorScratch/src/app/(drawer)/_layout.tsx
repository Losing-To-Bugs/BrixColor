import {Drawer} from "expo-router/drawer";

export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={{ headerShown: false, swipeEdgeWidth: 0 }}
            drawerContent={(props) => (<></>)}
        >
            <Drawer.Screen
                name="scan"
                options={{
                    drawerLabel: "Scan",
                    headerShown: false
                }}>

            </Drawer.Screen>
        </Drawer>
    )
}