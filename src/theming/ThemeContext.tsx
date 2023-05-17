// src/ThemeContext.js
import React from 'react';
import { themes } from './themes';
const ThemeContext = React.createContext({
    theme:themes.dark,
    toggleTheme: () => {},
  });
export default ThemeContext;
