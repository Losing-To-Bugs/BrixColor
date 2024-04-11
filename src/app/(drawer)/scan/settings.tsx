import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "@/components/ThemeContext";
import RNPickerSelect from "react-native-picker-select";
import { useRouter } from "expo-router";
import { HeaderBackButton } from "@react-navigation/elements";

const Settings = () => {
  const [toggleScans, setTogglescans] = useState(false);
  const [toggleAudio, setToggleAudio] = useState(false);
  const [toggleCapture, setToggleCapture] = useState(false);

  //might not use the select language here. For now temporpary.
  const [selectedLanguage, setSelectedLanguage] = useState("1");
  const dropdownLanguage = [{ label: "English", value: "1" }];

  const router = useRouter();

  //These handle all the toggles.
  const handleToggleScans = (value: boolean) => {
    setTogglescans(value);
    // Save the toggle state to storage or perform any other action
  };

  const handleToggleAudio = (value: boolean) => {
    setToggleAudio(value);
    // Save the toggle state to storage or perform any other action
  };

  const handleToggleCapture = (value: boolean) => {
    setToggleCapture(value);
    // Save the toggle state to storage or perform any other action
  };

  //These handle selection of the theme and font size.
  const { theme, setTheme, themes, fontSize, setFontSize, fontSizes } =
    useTheme();
  const handleChangeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };
  const handleChangeFont = (selectedFontSize) => {
    setFontSize(selectedFontSize);
  };
  const themeOptions = Object.keys(themes).map((themeKey) => ({
    label: themeKey,
    value: themeKey,
  }));
  const FontOptions = Object.keys(fontSizes).map((themeKey) => ({
    label: themeKey,
    value: themeKey,
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themes[theme].backgroundColor },
      ]}
    >
      <View style={styles.headerContainer}>
        <HeaderBackButton
          labelStyle={{ fontSize: fontSizes[fontSize].fontSize }}
          style={styles.backButton}
          onPress={() => router.dismiss()}
        />
        <Text
          style={[
            styles.headerText,
            {
              color: themes[theme].textColor,
              fontSize: fontSizes[fontSize].fontSize + 6,
            },
          ]}
        >
          Settings
        </Text>
      </View>
      <View
        style={[
          styles.divider,
          { backgroundColor: themes[theme].dividerColor },
        ]}
      />

      <View>
        <Text
          style={{
            color: themes[theme].textColor,
            marginLeft: 5,
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

      <View style={styles.toggleContainer}>
        <Text
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
            true: themes[theme].switchOnColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          value={toggleScans}
          onValueChange={handleToggleScans}
        />
      </View>
      <Text
        style={[
          styles.header2,
          {
            color: themes[theme].textColor,
            fontSize: fontSizes[fontSize].fontSize + 4,
          },
        ]}
      >
        ACCESSIBILITY SETTINGS
      </Text>
      <View style={styles.toggleContainer}>
        <Text
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
            true: themes[theme].switchOnColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          value={toggleAudio}
          onValueChange={handleToggleAudio}
        />
      </View>
      <View style={styles.toggleContainer}>
        <Text
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
            true: themes[theme].switchOnColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          value={toggleCapture}
          onValueChange={handleToggleCapture}
        />
      </View>
      <View>
        <Text
          style={{
            color: themes[theme].textColor,
            marginLeft: 5,
            fontSize: fontSizes[fontSize].fontSize,
          }}
        >
          Select UI color:
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
      <View>
        <Text
          style={{
            color: themes[theme].textColor,
            marginLeft: 5,
            fontSize: fontSizes[fontSize].fontSize,
          }}
        >
          Select Text Size
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
          onValueChange={(value) => handleChangeFont(value)}
          items={FontOptions}
          value={fontSize}
        />
      </View>
    </View>
  );
};
export default () => {
  return (
    <ThemeProvider>
      <Settings />
    </ThemeProvider>
  );
};

//All the syling still needs to be perfected. Including inline
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {},
  header2: {
    margin: 5,
    marginTop: 30,
    fontSize: 16,
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
});
