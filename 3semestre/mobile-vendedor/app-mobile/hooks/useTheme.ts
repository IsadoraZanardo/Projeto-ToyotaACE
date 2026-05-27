import { useColorScheme } from "react-native";

export function useTheme() {
  const scheme = useColorScheme();

  const isDark = scheme === "dark";

  return {
    isDark,
    colors: {
      background: isDark ? "#0f172a" : "#f8fafc",
      card: isDark ? "#1e293b" : "#ffffff",
      text: isDark ? "#f1f5f9" : "#0f172a",
      subtext: isDark ? "#94a3b8" : "#64748b",
      input: isDark ? "#334155" : "#e2e8f0",
      primary: "#e11d48", // vermelho Toyota
    },
  };
}