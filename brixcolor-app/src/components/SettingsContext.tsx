// SettingsContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestore, auth } from '@/services/firebaseConfig'; 
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

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

const SettingsContext = createContext<any>(null);

export const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState("Light");
    const [fontSize, setFontSize] = useState("Medium");
    const [iconSize, setIconSize] = useState("Medium");
    const [toggleAudio, setToggleAudio] = useState(false);
    const [toggleCapture, setToggleCapture] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (user) {
                // Fetch user settings from Firestore when logged in
                const userDoc = await getDoc(doc(firestore, 'settings', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setTheme(data.theme || "Light");
                    setFontSize(data.fontSize || "Medium");
                    setIconSize(data.iconSize || "Medium");
                    setToggleAudio(data.toggleAudio || false);
                    setToggleCapture(data.toggleCapture || false);
                }
            } else {
                // Load settings from AsyncStorage when logged out
                const savedTheme = await AsyncStorage.getItem("theme");
                const savedFontSize = await AsyncStorage.getItem("fontSize");
                const savedIconSize = await AsyncStorage.getItem("iconSize");
                const savedToggleAudio = await AsyncStorage.getItem("toggleAudio");
                const savedToggleCapture = await AsyncStorage.getItem("toggleCapture");

                setTheme(savedTheme || "Light");
                setFontSize(savedFontSize || "Medium");
                setIconSize(savedIconSize || "Medium");
                setToggleAudio(savedToggleAudio ? JSON.parse(savedToggleAudio) : false);
                setToggleCapture(savedToggleCapture ? JSON.parse(savedToggleCapture) : false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const saveTheme = async () => {
        try {
            await AsyncStorage.setItem("theme", theme);
            if (user) {
                await setDoc(doc(firestore, 'settings', user.uid), { theme }, { merge: true });
            }
        } catch (error) {
            console.error("Error saving theme:", error);
        }
    };
    
    const saveFontSize = async () => {
        try {
            await AsyncStorage.setItem("fontSize", fontSize);
            if (user) {
                await setDoc(doc(firestore, 'settings', user.uid), { fontSize }, { merge: true });
            }
        } catch (error) {
            console.error("Error saving font size:", error);
        }
    };
    
    const saveIconSize = async () => {
        try {
            await AsyncStorage.setItem("iconSize", iconSize);
            if (user) {
                await setDoc(doc(firestore, 'settings', user.uid), { iconSize }, { merge: true });
            }
        } catch (error) {
            console.error("Error saving icon size:", error);
        }
    };

    
    const saveToggleAudio = async (value) => {
        try {
            await AsyncStorage.setItem("toggleAudio", JSON.stringify(value));
            if (user) {
                await setDoc(doc(firestore, 'settings', user.uid), { toggleAudio: value }, { merge: true });
            }
        } catch (error) {
            console.error("Error saving toggle audio:", error);
        }
    };
    
    const saveToggleCapture = async (value) => {
        try {
            await AsyncStorage.setItem("toggleCapture", JSON.stringify(value));
            if (user) {
                await setDoc(doc(firestore, 'settings', user.uid), { toggleCapture: value }, { merge: true });
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
            saveToggleCapture
    }}
>
    {children}
    </SettingsContext.Provider>
);
};

export const useSettings = () => useContext(SettingsContext);
