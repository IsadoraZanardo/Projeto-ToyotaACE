import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../contexts/ThemeContext";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTintColor: theme.text,
        headerRight: () => <ThemeToggle />, // 🔥 aqui também
        tabBarStyle: {
          backgroundColor: "#111",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#ef4444",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="vehicle"
        options={{
          title: "Veículo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="financing"
        options={{
          title: "Financeiro",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="scheduling"
        options={{
          title: "Agenda",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}