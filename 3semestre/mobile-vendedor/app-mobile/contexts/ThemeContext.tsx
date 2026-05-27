import { createContext, useContext, useState } from "react";

const light = {
  background: "#F8FAFC",
  text: "#0F172A",
  subtext: "#64748B",
  card: "#FFFFFF",
  input: "#E2E8F0",
  primary: "#DC2626",
};

const dark = {
  background: "#020617",
  text: "#F1F5F9",
  subtext: "#94A3B8",
  card: "#0F172A",
  input: "#1E293B",
  primary: "#DC2626",
};

type ThemeType = {
  colors: typeof light;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext({} as ThemeType);

export function ThemeProvider({ children }: any) {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  return (
    <ThemeContext.Provider
      value={{
        colors: isDark ? dark : light,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}