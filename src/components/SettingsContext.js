// SettingsContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themes = {
  Light: {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    dividerColor: "#000000",
    switchOffColor: "#ffffff",
    switchOnColor: "#00FF00",
    primaryColor: "#0055BF",
    secondaryColor: "#C91A09",
  },
  Dark: {
    backgroundColor: "#3D3D3D",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    switchOffColor: "#FF0000",
    switchOnColor: "#00FF00",
    primaryColor: "#0055BF",
    secondaryColor: "#C91A09",
  },
  Royal: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    switchOffColor: "#FF0000",
    switchOnColor: "#00FF00",
    primaryColor: "#002263",
    secondaryColor: "#8B6508",
  },
  Sunset: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    switchOffColor: "#FF0000",
    switchOnColor: "#00FF00",
    primaryColor: "#01084F",
    secondaryColor: "#FF7954",
  },
  Fall: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    switchOffColor: "#FF0000",
    switchOnColor: "#00FF00",
    primaryColor: "#F55A00",
    secondaryColor: "#FFE433",
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
