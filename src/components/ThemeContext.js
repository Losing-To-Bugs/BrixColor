// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const themes = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    dividerColor: "#000000",
    switchColor: '#ffffff',
    switchOffColor: '#ffffff',
    switchOnColor: '#00FF00',
  },
  dark: {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    dividerColor: "#ffffff",
    switchColor: '#ffffff',
    switchOffColor: '#FF0000',
    switchOnColor: '#00FF00',
  },
  blue: {
    backgroundColor: '#6495ED',
    textColor: '#ffffff',
    dividerColor: "#ffffff",
    switchColor: '#ffffff',
    switchOffColor: '#FFFF00',
    switchOnColor: '#00FF00',
  },
  
  // Define more themes here...
};
const fontSizes = {
  Small: {
    fontSize: 14
  },
  default: {
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
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('default');
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, fontSize, setFontSize, fontSizes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
