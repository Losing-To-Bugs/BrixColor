import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "../components/ThemeContext";
import RNPickerSelect from "react-native-picker-select";

const Settings = () => {
  const [toggleScans, setTogglescans] = useState(false);
  const [toggleUI, setToggleUI] = useState(false);
  const [toggleAudio, setToggleAudio] = useState(false);
  const [toggleCapture, setToggleCapture] = useState(false);

  //might not use the select language here. For now temporpary.
  const [selectedLanguage, setSelectedLanguage] = useState("1");
  const dropdownLanguage = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
  ];

  //These handle all the toggles.
  const handleToggleScans = (value: boolean) => {
    setTogglescans(value);
    // Save the toggle state to storage or perform any other action
  };

  const handleToggleUI = (value: boolean) => {
    setToggleUI(value);
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
        <Text style={[styles.headerText, { color: themes[theme].textColor }]}>
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
        <Text style={{ color: themes[theme].textColor, marginLeft: 5 }}>
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
              fontSize: 16,
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
        <Text style={{ color: themes[theme].textColor }}>
          Save Scans to Phone
        </Text>
        <Switch
          trackColor={{
            false: themes[theme].switchOffColor,
            true: themes[theme].switchOnColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          thumbColor={themes[theme].switchColor}
          value={toggleScans}
          onValueChange={handleToggleScans}
        />
      </View>
      <Text style={[styles.header2, { color: themes[theme].textColor }]}>
        ACCESSIBILITY SETTINGS
      </Text>
      <View style={styles.toggleContainer}>
        <Text style={{ color: themes[theme].textColor }}>High Contrast UI</Text>
        <Switch
          trackColor={{
            false: themes[theme].switchOffColor,
            true: themes[theme].switchOnColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          thumbColor={themes[theme].switchColor}
          value={toggleUI}
          onValueChange={handleToggleUI}
        />
      </View>
      <View style={styles.toggleContainer}>
        <Text style={{ color: themes[theme].textColor }}>Audio Narration </Text>
        <Switch
          trackColor={{
            false: themes[theme].switchOffColor,
            true: themes[theme].switchOnColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          thumbColor={themes[theme].switchColor}
          value={toggleAudio}
          onValueChange={handleToggleAudio}
        />
      </View>
      <View style={styles.toggleContainer}>
        <Text style={{ color: themes[theme].textColor }}>
          Capture with Volume Button
        </Text>
        <Switch
          trackColor={{
            false: themes[theme].switchOffColor,
            true: themes[theme].switchOnColor,
          }}
          ios_backgroundColor={themes[theme].switchOffColor}
          thumbColor={themes[theme].switchColor}
          value={toggleCapture}
          onValueChange={handleToggleCapture}
        />
      </View>
      <View>
        <Text style={{ color: themes[theme].textColor, marginLeft: 5 }}>
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
              fontSize: 16,
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
        <Text style={{ color: themes[theme].textColor, marginLeft: 5 }}>
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
              fontSize: 16,
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
      <Text style={{ fontSize: fontSizes[fontSize].fontSize, marginLeft: 5 }}>
        Test Text for font sizing
      </Text>
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  header2: {
    margin: 5,
    marginTop: 30,
    fontSize: 16,
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
