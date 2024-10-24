import { Stack } from "expo-router";

export default function ScanLayout() {
    return <Stack>
        <Stack.Screen
            name="settings"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
        name="history"
        options={{
            headerShown: false,
        }}
        />
    </Stack>;
}