// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const themes = {
  Light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    dividerColor: "#000000",
    switchOffColor: '#ffffff',
    switchOnColor: '#00FF00',
    primaryColor: '#0055BF',
    secondaryColor: '#C91A09',
  },
  Dark: {
    backgroundColor: '#3D3D3D',
    textColor: '#ffffff',
    dividerColor: "#ffffff",
    switchOffColor: '#FF0000',
    switchOnColor: '#00FF00',
    primaryColor: '#0055BF',
    secondaryColor: '#C91A09',
  },
  Royal: {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    dividerColor: "#ffffff",
    switchOffColor: '#FF0000',
    switchOnColor: '#00FF00',
    primaryColor: '#002263',
    secondaryColor: '#8B6508',
  },
  Sunset: {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    dividerColor: "#ffffff",
    switchOffColor: '#FF0000',
    switchOnColor: '#00FF00',
    primaryColor: '#01084F',
    secondaryColor: '#FF7954',
  },
  Fall: {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    dividerColor: "#ffffff",
    switchOffColor: '#FF0000',
    switchOnColor: '#00FF00',
    primaryColor: '#F55A00',
    secondaryColor: '#FFE433',
  },
  
  // Define more themes here...
};
const fontSizes = {
  Small: {
    fontSize: 14
  },
  Medium: {
    fontSize: 16
  },
  Big: {
    fontSize: 18
  },
  Huge: {
    fontSize: 20
  },
};
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('Light');
  const [fontSize, setFontSize] = useState('Medium');
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, fontSize, setFontSize, fontSizes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
