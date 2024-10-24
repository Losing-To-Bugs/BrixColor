import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { SettingsProvider, useSettings } from "@/components/SettingsContext";
import { BrixDrawerItem } from "@/app/components/BrixDrawerItem";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { HISTORYKEY } from "@/constants/database-strings";

function DrawerContent(
  props: DrawerContentComponentProps & {
    handleLogout: () => void;
    isLoggedIn: boolean;
  }
) {
  const router = useRouter();

  const { theme, themes, fontSize, fontSizes } = useSettings();

  useEffect(() => {
    // console.log(props.isLoggedIn)
  }, [props.isLoggedIn]);

  // Styles
  const drawerItemStyle = {
    fontSize: fontSizes[fontSize].fontSize,
    color: themes[theme].textColor,
  };

  return (
    <>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 0 }}
      >
        <View
          style={[
            {
              backgroundColor: themes[theme].primaryColor,
              paddingTop: 15,
              paddingBottom: 5,
              flexDirection: "row",
              justifyContent: "center",
            },
          ]}
        >
          <Text
            accessible={false}
            style={[
              {
                color: themes[theme].headerColor,
                fontSize: fontSizes[fontSize].fontSize + 6,
                fontWeight: "bold",
              },
            ]}
          >
            BrixColor
          </Text>
        </View>
        <View
          style={{
            backgroundColor: themes[theme].backgroundColor2,
            padding: 10,
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <View style={{ gap: 10 }}>
            <BrixDrawerItem
              href="/scan/settings"
              accessibilityLabel="Settings"
              accessibilityHint="Navigates to application settings"
              accessibilityRole="button"
            >
              <Text style={drawerItemStyle}>Settings</Text>
            </BrixDrawerItem>

            {/* uncomment to test history list and popup modal */}
            <BrixDrawerItem
              href="/scan/history"
              accessibilityLabel="History"
              accessibilityHint="Navigates to scan history"
              accessibilityRole="button"
            >
              <Text style={drawerItemStyle}>History</Text>
            </BrixDrawerItem>
          </View>
          <View
            style={{
              backgroundColor: themes[theme].backgroundColor2,
              marginHorizontal: 5,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={[
                {
                  backgroundColor: themes[theme].dividerColor,
                  height: 1,
                  marginBottom: 10,
                },
              ]}
            />
            <TouchableOpacity
              onPress={() => {
                // if logged in you will logout
                if (props.isLoggedIn) {
                  props.handleLogout();
                } else {
                  // if logged out, log in
                  router.push("/LoginPage");
                }
              }}
              accessibilityLabel={props.isLoggedIn ? "Log out" : "Log in"}
              accessibilityRole="button"
              style={{
                alignSelf: "center",
                paddingVertical: 10,
                paddingHorizontal: "30%",
                borderRadius: 5,
                backgroundColor: themes[theme].primaryColor,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "white",
                }}
              >
                {props.isLoggedIn ? "Logout" : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </>
  );
}

export default function DrawerLayout() {
  // State variables to track login state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Effect to check login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Function to check login status
  const checkLoginStatus = async () => {
    try {
      // Check if user is logged in by checking if there is saved data
      const userData = await AsyncStorage.getItem("uid");
      const loggedIn = userData !== null;
      setIsLoggedIn(loggedIn);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage or perform other logout actions
      await signOut(auth);
      setIsLoggedIn(false); // Update login state
      await AsyncStorage.removeItem(HISTORYKEY);
      await AsyncStorage.removeItem("uid");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Return null until the login state is calculated
  if (isLoggedIn === null) {
    return null;
  }

  return (
    <SettingsProvider>
      <Drawer
        screenOptions={{ headerShown: false, swipeEdgeWidth: 0 }}
        drawerContent={(props) => (
          <DrawerContent
            {...props}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        )}
      >
        <Drawer.Screen
          name="scan"
          options={{
            drawerLabel: "Scan",
            headerShown: false,
          }}
        />
      </Drawer>
    </SettingsProvider>
  );
}
