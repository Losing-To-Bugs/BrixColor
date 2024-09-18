import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import { SettingsProvider, useSettings } from "@/components/SettingsContext";
import RNPickerSelect from "react-native-picker-select";
import { useRouter } from "expo-router";
import { HeaderBackButton } from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const saveSettingsToStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const {
    theme,
    themes,
    setTheme,
    fontSize,
    fontSizes,
    setFontSize,
    iconSize,
    setIconSize,
    iconSizes,
    toggleScans,
    setTogglescans,
    toggleAudio,
    setToggleAudio,
    toggleCapture,
    setToggleCapture,
  } = useSettings();

  //might not use the select language here. For now temporpary.
  const [selectedLanguage, setSelectedLanguage] = useState("1");
  const dropdownLanguage = [{ label: "English", value: "1" }];

  const router = useRouter();

  const handleToggleScans = (value: boolean) => {
    setTogglescans(value);
    saveSettingsToStorage("toggleScans", JSON.stringify(value));
  };

  const handleToggleAudio = (value: boolean) => {
    setToggleAudio(value);
    saveSettingsToStorage("toggleAudio", JSON.stringify(value));
  };

  const handleToggleCapture = (value: boolean) => {
    setToggleCapture(value);
    saveSettingsToStorage("toggleCapture", JSON.stringify(value));
  };

  const handleChangeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    saveSettingsToStorage("theme", selectedTheme);
  };

  const handleChangeFontSize = (selectedFontSize) => {
    setFontSize(selectedFontSize);
    saveSettingsToStorage("fontSize", selectedFontSize);
  };

  const handleChangeIconSize = (selectedIconSize) => {
    setIconSize(selectedIconSize);
    saveSettingsToStorage("iconSize", selectedIconSize);
  };
  //These handle selection of the theme and font size.

  const themeOptions = Object.keys(themes).map((themeKey) => ({
    label: themeKey,
    value: themeKey,
  }));
  const FontOptions = Object.keys(fontSizes).map((themeKey) => ({
    label: themeKey,
    value: themeKey,
  }));
  const IconOptions = Object.keys(iconSizes).map((themeKey) => ({
    label: themeKey,
    value: themeKey,
  }));
  return (
    <ScrollView
      accessible={false}
      style={[
        styles.container,
        { backgroundColor: themes[theme].backgroundColor },
      ]}
    >
      <View style={[styles.headerContainer, { backgroundColor: themes[theme].primaryColor },
      ]} >
        <HeaderBackButton
          accessibilityLabel="Back button"
          labelStyle={{ fontSize: fontSizes[fontSize].fontSize, color: themes[theme].headerColor }}
          tintColor={themes[theme].headerColor}
          style={[
            styles.backButton
          ]}
          onPress={() => router.dismiss()}
        />
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
          Settings
        </Text>
      </View>
      <Text
        accessible={false}
        style={[
          styles.header2,
          {
            color: themes[theme].textColor,
            fontSize: fontSizes[fontSize].fontSize + 4,
            paddingTop: 25
          },
        ]}
      >
        General Settings
      </Text>
      <View accessible={false} style={[
        styles.container,
        { backgroundColor: themes[theme].backgroundColor2,
          marginHorizontal: 10,
          borderRadius: 5,
          paddingTop: 5
         },
      ]}>
      
        <View accessible={true} accessibilityLabel="Language selection">
        <Text
          style={{
            color: themes[theme].textColor,
            marginLeft: 5,
            marginVertical: 0,
            fontSize: fontSizes[fontSize].fontSize,
          }}
        >
          Select Language:
        </Text>
        <RNPickerSelect
          placeholder={{}}
          items={dropdownLanguage}
          style={{
            iconContainer: {
              top: 20,
              right: 10,
            },
            inputIOS: {
              color: themes[theme].textColor,
              margin: 5,
              fontSize: fontSizes[fontSize].fontSize,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: themes[theme].dividerColor,
              borderRadius: 4,
              paddingRight: 30,
              marginBottom: 10,
            },
          }}
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  borderTopWidth: 10,
                  borderTopColor: themes[theme].textColor,
                  borderRightWidth: 10,
                  borderRightColor: "transparent",
                  borderLeftWidth: 10,
                  borderLeftColor: "transparent",
                  width: 0,
                  height: 0,
                  marginTop: 5,
                }}
              />
            );
          }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        />
      </View>
      <View
        style={[
          styles.divider,
          { backgroundColor: themes[theme].dividerColor },
        ]}
      />
      <View style={styles.toggleContainer}>
        <Text
          accessible={false}
          style={{
            color: themes[theme].textColor,
            fontSize: fontSizes[fontSize].fontSize,
          }}
        >
          Save Scans to Phone
        </Text>
        <Switch
          trackColor={{
            false: themes[theme].switchOffColor,
            true: themes[theme].primaryColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          value={toggleScans}
          onValueChange={handleToggleScans}
          accessible={true}
          accessibilityLabel="Save Scans to Phone"
          accessibilityRole="switch"
          accessibilityValue={{ text: toggleScans ? "true" : "false" }}
        />
      </View>

      </View>
      <Text
        accessible={false}
        style={[
          styles.header2,
          {
            color: themes[theme].textColor,
            fontSize: fontSizes[fontSize].fontSize + 4,
            paddingTop: 25
          },
        ]}
      >
        Accessibility Settings
      </Text>
      <View accessible={false} style={[
             styles.container,
             { backgroundColor: themes[theme].backgroundColor2,
               marginHorizontal: 10,
               borderRadius: 5,
               paddingTop: 5
              },
      ]}>
      <View style={styles.toggleContainer}>
        <Text
          accessible={false}
          style={{
            color: themes[theme].textColor,
            fontSize: fontSizes[fontSize].fontSize,
          }}
        >
          Audio Narration{" "}
        </Text>
        <Switch
          trackColor={{
            false: themes[theme].switchOffColor,
            true: themes[theme].primaryColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          value={toggleAudio}
          onValueChange={handleToggleAudio}
          accessible={true}
          accessibilityLabel="App Audio Narration"
          accessibilityRole="switch"
          accessibilityValue={{ text: toggleScans ? "true" : "false" }}
        />
      </View>
      <View
        style={[
          styles.divider,
          { backgroundColor: themes[theme].dividerColor },
        ]}
      />
      <View style={styles.toggleContainer}>
        <Text
          accessible={false}
          style={{
            color: themes[theme].textColor,
            fontSize: fontSizes[fontSize].fontSize,
          }}
        >
          Capture with Volume Button
        </Text>
        <Switch
          trackColor={{
            false: themes[theme].switchOffColor,
            true: themes[theme].primaryColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          value={toggleCapture}
          onValueChange={handleToggleCapture}
          accessible={true}
          accessibilityLabel="Scan with volume buttons"
          accessibilityRole="switch"
          accessibilityValue={{ text: toggleScans ? "true" : "false" }}
        />
      </View>
      <View
        style={[
          styles.divider,
          { backgroundColor: themes[theme].dividerColor },
        ]}
      />
      <View accessible={true} accessibilityLabel="Select UI Theme">
        <Text
          style={{
            color: themes[theme].textColor,
            marginLeft: 5,
            fontSize: fontSizes[fontSize].fontSize,
          }}
        >
          Select UI Theme:
        </Text>
        <RNPickerSelect
          placeholder={{}}
          style={{
            iconContainer: {
              top: 20,
              right: 10,
            },
            inputIOS: {
              color: themes[theme].textColor,
              margin: 5,
              fontSize: fontSizes[fontSize].fontSize,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: themes[theme].dividerColor,
              borderRadius: 4,
              paddingRight: 30,
              marginBottom: 10,
            },
          }}
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  borderTopWidth: 10,
                  borderTopColor: themes[theme].textColor,
                  borderRightWidth: 10,
                  borderRightColor: "transparent",
                  borderLeftWidth: 10,
                  borderLeftColor: "transparent",
                  width: 0,
                  height: 0,
                  marginTop: 5,
                }}
              />
            );
          }}
          onValueChange={(value) => handleChangeTheme(value)}
          items={themeOptions}
          value={theme}
        />
      </View>
      <View
        style={[
          styles.divider,
          { backgroundColor: themes[theme].dividerColor },
        ]}
      />
      <View accessible={true} accessibilityLabel="Select Text Font Size">
        <Text
          style={{
            color: themes[theme].textColor,
            marginLeft: 5,
            fontSize: fontSizes[fontSize].fontSize,
          }}
        >
          Select Text Font Size
        </Text>
        <RNPickerSelect
          placeholder={{}}
          style={{
            iconContainer: {
              top: 20,
              right: 10,
            },
            inputIOS: {
              color: themes[theme].textColor,
              margin: 5,
              fontSize: fontSizes[fontSize].fontSize,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: themes[theme].dividerColor,
              borderRadius: 4,
              paddingRight: 30,
              marginBottom: 10,
            },
          }}
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  borderTopWidth: 10,
                  borderTopColor: themes[theme].textColor,
                  borderRightWidth: 10,
                  borderRightColor: "transparent",
                  borderLeftWidth: 10,
                  borderLeftColor: "transparent",
                  width: 0,
                  height: 0,
                  marginTop: 5,
                }}
              />
            );
          }}
          onValueChange={(value) => handleChangeFontSize(value)}
          items={FontOptions}
          value={fontSize}
        />
      </View>
      <View
        style={[
          styles.divider,
          { backgroundColor: themes[theme].dividerColor },
        ]}
      />
      <View accessible={true} accessibilityLabel="Select Icon Size">
        <Text
          style={{
            color: themes[theme].textColor,
            marginLeft: 5,
            fontSize: fontSizes[fontSize].fontSize,
          }}
        >
          Select Icon Size
        </Text>
        <RNPickerSelect
          placeholder={{}}
          style={{
            iconContainer: {
              top: 20,
              right: 10,
            },
            inputIOS: {
              color: themes[theme].textColor,
              margin: 5,
              fontSize: fontSizes[fontSize].fontSize,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: themes[theme].dividerColor,
              borderRadius: 4,
              paddingRight: 30,
              marginBottom: 10,
            },
          }}
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  borderTopWidth: 10,
                  borderTopColor: themes[theme].textColor,
                  borderRightWidth: 10,
                  borderRightColor: "transparent",
                  borderLeftWidth: 10,
                  borderLeftColor: "transparent",
                  width: 0,
                  height: 0,
                  marginTop: 5,
                }}
              />
            );
          }}
          onValueChange={(value) => handleChangeIconSize(value)}
          items={IconOptions}
          value={iconSize}
        />
      </View>
      </View>
    </ScrollView>
  );
};
export default () => {
  return <Settings />;
};

//All the syling still needs to be perfected. Including inline
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginVertical: 0,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header2: {
    margin: 5,
    marginTop: 5,
    fontSize: 16,
    opacity: .75,
  fontWeight: 'bold'
  },
  backButton: {
    position: "absolute",
    left: "0%", // Has it all the way left of the container
  },
  divider: {
    height: 1,
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
    margin: 5,
  },
  colorBlock: {
    width: 70,
    height: 70,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
});
