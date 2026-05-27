import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";

export default function ProfilePage() {
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();

  // Dados do cliente
  const dadosCliente = {
    nome: "Rayan Teixeira",
    cpf: "123.456.789-00",
    email: "rayan.teixeira@email.com",
    modeloVeiculo: "Corolla Cross XRE 2025",
    statusVeiculo: "EM PRODUÇÃO",
    cor: "Branco Pérola",
    motor: "2.0 Flex",
  };

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Espaço seguro no topo (Status Bar + margem extra) */}
      <View style={styles.topSpacing} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Perfil do Cliente
        </Text>
        <Text style={[styles.subtitle, { color: colors.subtext || colors.text }]}>
          Visualize suas informações e dados do veículo.
        </Text>
      </View>

      {/* DADOS PESSOAIS */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Dados Pessoais
        </Text>

        <View style={styles.row}>
          <Ionicons name="person" size={22} color="#ef4444" />
          <View>
            <Text style={[styles.label, { color: colors.subtext || "#888" }]}>Nome</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {dadosCliente.nome}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="mail" size={22} color="#ef4444" />
          <View>
            <Text style={[styles.label, { color: colors.subtext || "#888" }]}>Email</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {dadosCliente.email}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="card" size={22} color="#ef4444" />
          <View>
            <Text style={[styles.label, { color: colors.subtext || "#888" }]}>CPF</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {dadosCliente.cpf}
            </Text>
          </View>
        </View>
      </View>

      

      {/* Botão de Trocar Tema */}
      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: colors.card }]}
        onPress={toggleTheme}
      >
        <Ionicons 
          name={isDark ? "moon" : "sunny"} 
          size={22} 
          color={colors.text} 
        />
        <Text style={[styles.themeText, { color: colors.text }]}>
          Tema: {isDark ? "Escuro 🌙" : "Claro ☀️"}
        </Text>
      </TouchableOpacity>

      {/* Espaço flexível - empurra o botão Sair para a base */}
      <View style={{ flex: 1, minHeight: 30 }} />

      {/* BOTÃO SAIR FIXO NA BASE */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: "#ef4444" }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,   // espaço maior na base para Tab Bar
  },
  topSpacing: {
    height: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 50, // Espaço seguro no topo
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
  },
  card: {
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 15.5,
    fontWeight: "600",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
  subinfo: {
    fontSize: 13,
    marginTop: 2,
  },

  /* Botão Tema */
  themeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  themeText: {
    fontSize: 16,
    fontWeight: "500",
  },

  /* Botão Sair */
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});