// SettingsContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themes = {
  Light: {
    backgroundColor: "#E0E0E0",
    backgroundColor2: "#ffffff",
    textColor: "#000000",
    textColor2: "#ffffff",
    dividerColor: "#E0E0E0",
    switchOffColor: "#E0E0E0",
    primaryColor: "#0055BF",
    headerColor: "#FAFAFC"
  },
  Dark: {
    backgroundColor: "#2B2B35",
    backgroundColor2: "#343D46",
    textColor: "#ffffff",
    textColor2: "#000000",
    dividerColor: "#ffffff",
    switchOffColor: "#E0E0E0",
    primaryColor: "#1F449C",
    secondaryColor: "#C91A09",
    headerColor: "#F0F5FF"
  },
  Royal: {
    backgroundColor: "#E0E0E0",
    backgroundColor2: "#ffffff",
    textColor: "#000000",
    textColor2: "#ffffff",
    dividerColor: "#E0E0E0",
    switchOffColor: "#E0E0E0",
    primaryColor: "#8B6508",
    headerColor: "#FAFAFC"
  },
  Coral: {
    backgroundColor: "#2B2B35",
    backgroundColor2: "#343D46",
    textColor: "#ffffff",
    textColor2: "#000000",
    dividerColor: "#ffffff",
    switchOffColor: "#E0E0E0",
    primaryColor: "#FF7954",
    headerColor: "#F0F5FF"
  },

  // Define more themes here...
};
const fontSizes = {
  Small: {
    fontSize: 14,
  },
  Medium: {
    fontSize: 16,
  },
  Big: {
    fontSize: 18,
  },
  Huge: {
    fontSize: 20,
  },
};

const iconSizes = {
  Small: {
    Size: 24,
  },
  Medium: {
    Size: 32,
  },
  Big: {
    Size: 40,
  },
  Huge: {
    Size: 48,
  },
};

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("Light");
  const [fontSize, setFontSize] = useState("Medium");
  const [iconSize, setIconSize] = useState("Medium");
  const [toggleScans, setTogglescans] = useState(false);
  const [toggleAudio, setToggleAudio] = useState(false);
  const [toggleCapture, setToggleCapture] = useState(false);

  // Load theme, font size, and toggle states from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme !== null) {
          setTheme(savedTheme);
        }

        const savedFontSize = await AsyncStorage.getItem("fontSize");
        if (savedFontSize !== null) {
          setFontSize(savedFontSize);
        }

        const savedIconSize = await AsyncStorage.getItem("iconSize");
        if (savedIconSize !== null) {
          setIconSize(savedIconSize);
        }

        const savedToggleScans = await AsyncStorage.getItem("toggleScans");
        if (savedToggleScans !== null) {
          setTogglescans(JSON.parse(savedToggleScans));
        }

        const savedToggleAudio = await AsyncStorage.getItem("toggleAudio");
        if (savedToggleAudio !== null) {
          setToggleAudio(JSON.parse(savedToggleAudio));
        }

        const savedToggleCapture = await AsyncStorage.getItem("toggleCapture");
        if (savedToggleCapture !== null) {
          setToggleCapture(JSON.parse(savedToggleCapture));
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        themes,
        fontSize,
        setFontSize,
        fontSizes,
        iconSize,
        setIconSize,
        iconSizes,
        toggleScans,
        setTogglescans,
        toggleAudio,
        setToggleAudio,
        toggleCapture,
        setToggleCapture,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
