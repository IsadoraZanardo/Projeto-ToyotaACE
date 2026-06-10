import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeColors = {
  background: string;
  sidebar: string;
  card: string;
  cardSoft: string;
  box: string;
  input: string;
  border: string;
  text: string;
  subtext: string;
  primary: string;
  primaryDark: string;
  success: string;
  danger: string;
};

type ThemeContextData = {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => Promise<void>;
};

const darkColors: ThemeColors = {
  background: "#0B0B0B",
  sidebar: "#111111",
  card: "#171717",
  cardSoft: "#1D1D1F",
  box: "#222222",
  input: "#141414",
  border: "#2A2A2A",
  text: "#FFFFFF",
  subtext: "#9CA3AF",
  primary: "#E41D3D",
  primaryDark: "#B91C1C",
  success: "#22C55E",
  danger: "#EF4444",
};

const lightColors: ThemeColors = {
  background: "#F4F4F5",
  sidebar: "#FFFFFF",
  card: "#FFFFFF",
  cardSoft: "#F9FAFB",
  box: "#F3F4F6",
  input: "#FFFFFF",
  border: "#E5E7EB",
  text: "#111827",
  subtext: "#6B7280",
  primary: "#E41D3D",
  primaryDark: "#B91C1C",
  success: "#16A34A",
  danger: "#DC2626",
};

const ThemeContext = createContext<ThemeContextData>({
  colors: darkColors,
  isDark: true,
  toggleTheme: async () => {},
});

const STORAGE_KEY = "@toyota_ace_vendedor:theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    carregarTemaSalvo();
  }, []);

  async function carregarTemaSalvo() {
    try {
      const temaSalvo = await AsyncStorage.getItem(STORAGE_KEY);

      if (temaSalvo !== null) {
        setIsDark(temaSalvo === "dark");
      }
    } catch (error) {
      console.log("Erro ao carregar tema:", error);
    }
  }

  async function toggleTheme() {
    try {
      const novoTema = !isDark;

      setIsDark(novoTema);

      await AsyncStorage.setItem(
        STORAGE_KEY,
        novoTema ? "dark" : "light"
      );
    } catch (error) {
      console.log("Erro ao salvar tema:", error);
    }
  }

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}