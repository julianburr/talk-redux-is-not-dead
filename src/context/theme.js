import React, { createContext, useState, useCallback } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider (props) {
  const [ theme, setThemeState ] = useState(
    window.localStorage.getItem('theme')
  );
  const resetTheme = useCallback(() => setTheme(null));
  const setTheme = useCallback((theme) => {
    window.localStorage.setItem('theme', theme);
    setThemeState(theme);
  });

  return (
    <ThemeContext.Provider
      {...props}
      value={{
        theme,
        setTheme,
        resetTheme
      }}
    />
  );
}
