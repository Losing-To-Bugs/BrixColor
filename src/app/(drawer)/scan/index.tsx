import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ScanCamera from "@/components/ScanCamera";
import pageStyles from "@/styles/page";
import buttonStyles from "@/styles/button";
import { Drawer } from "expo-router/drawer";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import BrixDrawerToggleButton from "@/components/BrixDrawerToggleButton";
import * as ImagePicker from "expo-image-picker";
import { SettingsProvider, useSettings } from "@/components/SettingsContext";

const Page = () => {
  const [flashOn, setFlash] = useState(false);
  const [imageUri, setImageUri] = useState<string>(null);

  const handleFlashPress = () => {
    setFlash(!flashOn);
  };

  const handleImagePickPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  const { theme, themes, fontSize, fontSizes, iconSize, iconSizes } =
    useSettings();

  return (
    <View style={pageStyles.container}>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      {/* Header */}
      <View style={pageStyles.header}>
        {/* Opens and closes drawer */}
        <BrixDrawerToggleButton
          style={[{ marginLeft: 15 }]}
          size={iconSizes[iconSize].Size}
        />

        {/* Help button */}
        <TouchableOpacity
          style={[{ marginRight: 15 }]}
          accessibilityLabel="Help"
          accessibilityHint="Display useful instructions on how to use the application"
          accessibilityRole="button"
        >
          <Feather
            name="help-circle"
            color="white"
            size={iconSizes[iconSize].Size}
          />
        </TouchableOpacity>
      </View>

      <ScanCamera style={styles.camera} flashOn={flashOn}>
        <View style={styles.control}>
          {/* Shutter button */}
          <TouchableOpacity
            style={buttonStyles.circle}
            accessibilityLabel="Shutter button"
            accessibilityHint="Takes photo to scan brick"
            accessibilityRole="button"
          />

          <View style={{ flexDirection: "row", gap: 30 }}>
            {/* Flash button */}
            <TouchableOpacity
              onPress={handleFlashPress}
              accessibilityLabel="Toggle flash"
              accessibilityHint="Toggles the camera flash"
              accessibilityRole="togglebutton"
              accessibilityState={{ checked: flashOn }}
            >
              {flashOn ? (
                <Ionicons
                  name="flash"
                  color="white"
                  size={iconSizes[iconSize].Size}
                />
              ) : (
                <Ionicons
                  name="flash-off"
                  color="white"
                  size={iconSizes[iconSize].Size}
                />
              )}
            </TouchableOpacity>

            {/* Open photos button */}
            <TouchableOpacity
              onPress={handleImagePickPress}
              accessibilityLabel="Open photos"
              accessibilityHint="Open photo album to choose picture to scan"
              accessibilityRole="button"
            >
              <FontAwesome
                name="photo"
                color="white"
                size={iconSizes[iconSize].Size}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScanCamera>

      <StatusBar style="auto" />
    </View>
  );
};
export default () => {
  return <Page />;
};
const styles = StyleSheet.create({
  camera: {
    flex: 10,
    alignItems: "center",
    justifyContent: "center",

    fontWeight: "bold",
    fontSize: 48,
    width: "100%",
  },

  control: {
    flex: 3 / 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    backgroundColor: "rgba(0,0,0,0.375)",
    marginTop: "auto",
  },
});
