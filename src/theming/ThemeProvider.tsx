// src/ThemeProvider.js
import React, { useState,ReactNode } from 'react';
import ThemeContext from './ThemeContext';
import { themes } from './themes';

type ThemeProviderProps = {
    children: ReactNode;
  };

export default function ThemeProvider({ children }:ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState(themes.dark);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
