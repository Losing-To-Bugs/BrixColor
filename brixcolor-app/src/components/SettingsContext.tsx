import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { SETTINGSURL } from "@/constants/database-strings";

const themes = {
  Light: {
    backgroundColor: "#E0E0E0",
    backgroundColor2: "#ffffff",
    textColor: "#000000",
    textColor2: "#ffffff",
    dividerColor: "#E0E0E0",
    switchOffColor: "#E0E0E0",
    primaryColor: "#0055BF",
    headerColor: "#FAFAFC",
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
    headerColor: "#F0F5FF",
  },
  Royal: {
    backgroundColor: "#E0E0E0",
    backgroundColor2: "#ffffff",
    textColor: "#000000",
    textColor2: "#ffffff",
    dividerColor: "#E0E0E0",
    switchOffColor: "#E0E0E0",
    primaryColor: "#8B6508",
    headerColor: "#FAFAFC",
  },
  Coral: {
    backgroundColor: "#2B2B35",
    backgroundColor2: "#343D46",
    textColor: "#ffffff",
    textColor2: "#000000",
    dividerColor: "#ffffff",
    switchOffColor: "#E0E0E0",
    primaryColor: "#FF7954",
    headerColor: "#F0F5FF",
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

const SettingsContext = createContext<any>(null);

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("Light");
  const [fontSize, setFontSize] = useState("Medium");
  const [iconSize, setIconSize] = useState("Medium");
  const [toggleAudio, setToggleAudio] = useState(false);
  const [toggleCapture, setToggleCapture] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        const storedFontSize = await AsyncStorage.getItem("fontSize");
        const storedIconSize = await AsyncStorage.getItem("iconSize");
        const storedToggleAudio = await AsyncStorage.getItem("toggleAudio");
        const storedToggleCapture = await AsyncStorage.getItem("toggleCapture");

        if (storedTheme) setTheme(storedTheme);
        if (storedFontSize) setFontSize(storedFontSize);
        if (storedIconSize) setIconSize(storedIconSize);
        if (storedToggleAudio !== null)
          setToggleAudio(JSON.parse(storedToggleAudio));
        if (storedToggleCapture !== null)
          setToggleCapture(JSON.parse(storedToggleCapture));
      } catch (error) {
        console.error("Error loading settings from AsyncStorage:", error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        // Fetch user settings from MongoDB when logged in
        try {
          const response = await fetch(`${SETTINGSURL}?uid=${user.uid}`);
          const data = await response.json();

          if (data) {
            setTheme(data.theme || "Light");
            setFontSize(data.fontSize || "Medium");
            setIconSize(data.iconSize || "Medium");
            setToggleAudio(data.toggleAudio || false);
            setToggleCapture(data.toggleCapture || false);
          }
        } catch (error) {
          console.error("Error fetching settings from MongoDB:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Save to MongoDB API
  const saveToMongoDB = async () => {
    const userSetting = {
      uid: user?.uid,
      theme,
      fontSize,
      iconSize,
      toggleAudio,
      toggleCapture,
    };

    try {
      const payload = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userSetting),
      };

      const response = await fetch(`${SETTINGSURL}`, payload);
      if (!response.ok) {
        throw new Error("Error saving settings to MongoDB");
      }
    } catch (error) {
      console.error("Error saving settings to MongoDB:", error);
    }
  };

  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem("theme", theme);
      if (user) {
        await saveToMongoDB();
      }
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const saveFontSize = async () => {
    try {
      await AsyncStorage.setItem("fontSize", fontSize);
      if (user) {
        await saveToMongoDB();
      }
    } catch (error) {
      console.error("Error saving font size:", error);
    }
  };

  const saveIconSize = async () => {
    try {
      await AsyncStorage.setItem("iconSize", iconSize);
      if (user) {
        await saveToMongoDB();
      }
    } catch (error) {
      console.error("Error saving icon size:", error);
    }
  };

  const saveToggleAudio = async (value) => {
    try {
      await AsyncStorage.setItem("toggleAudio", JSON.stringify(value));
      if (user) {
        await saveToMongoDB();
      }
    } catch (error) {
      console.error("Error saving toggle audio:", error);
    }
  };

  const saveToggleCapture = async (value) => {
    try {
      await AsyncStorage.setItem("toggleCapture", JSON.stringify(value));
      if (user) {
        await saveToMongoDB();
      }
    } catch (error) {
      console.error("Error saving toggle capture:", error);
    }
  };

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
        toggleAudio,
        setToggleAudio,
        toggleCapture,
        setToggleCapture,
        saveTheme,
        saveFontSize,
        saveIconSize,
        saveToggleAudio,
        saveToggleCapture,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
