import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

// ❗ caminho corrigido
import corolla from "../../assets/corolla.png";

export default function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const item = {
    model: "Corolla Cross XRE 2025",
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.background }
      ]}
      contentContainerStyle={{ paddingBottom: 100 }} // 🔥 evita navbar cobrir
    >

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Olá, {user?.name || "Usuário"} 👋
        </Text>

        <Text style={[styles.subtitle, { color: theme.subtext }]}>
          Acompanhe o status do seu veículo em tempo real.
        </Text>
      </View>

      {/* CARDS */}
      <View style={styles.grid}>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.subtext }]}>
            🚗 Status do Veículo
          </Text>
          <Text style={[styles.cardMain, { color: theme.text }]}>
            Em Produção
          </Text>
          <Text style={[styles.cardSub, { color: theme.subtext }]}>
            {item.model}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.subtext }]}>
            🏭 Etapa Atual
          </Text>
          <Text style={[styles.cardMain, { color: theme.text }]}>
            Montagem
          </Text>

          <View
            style={[
              styles.progressBar,
              { backgroundColor: theme.progressBg }
            ]}
          >
            <View
              style={[
                styles.progressFill,
                { width: "50%", backgroundColor: theme.primary }
              ]}
            />
          </View>

          <Text style={[styles.cardSub, { color: theme.subtext }]}>
            50% concluído
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.subtext }]}>
            📋 Próximas Ações
          </Text>
          <Text style={[styles.cardSub, { color: theme.subtext }]}>
            • Pintura programada
          </Text>
          <Text style={[styles.cardSub, { color: theme.subtext }]}>
            • Inspeção
          </Text>
          <Text style={[styles.cardSub, { color: theme.subtext }]}>
            • Liberação
          </Text>
        </View>

      </View>

      {/* CARD GRANDE */}
      <View style={[styles.bigCard, { backgroundColor: theme.card }]}>

        <View>
          <Text style={[styles.userName, { color: theme.primary }]}>
            {user?.name || "Cliente"}
          </Text>

          <View style={[styles.vehicleBox, { backgroundColor: theme.box }]}>
            <Text style={[styles.vehicleTitle, { color: theme.text }]}>
              Seu Veículo
            </Text>
            <Text style={{ color: theme.subtext }}>
              {item.model}
            </Text>
          </View>
        </View>

        <Image source={corolla} style={styles.carImage} />

        <View style={[styles.quoteBox, { backgroundColor: theme.box }]}>
          <Text style={[styles.quote, { color: theme.subtext }]}>
            "Revisar o carro novo garante sua segurança."
          </Text>
        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },

  header: {
    marginBottom: 20
  },

  title: {
    fontSize: 22,
    fontWeight: "bold"
  },

  subtitle: {
    marginTop: 5
  },

  grid: {
    gap: 12,
    marginBottom: 20
  },

  card: {
    padding: 16,
    borderRadius: 12
  },

  cardTitle: {
    marginBottom: 6
  },

  cardMain: {
    fontSize: 18,
    fontWeight: "bold"
  },

  cardSub: {
    marginTop: 4
  },

  progressBar: {
    height: 6,
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden"
  },

  progressFill: {
    height: "100%"
  },

  bigCard: {
    borderRadius: 16,
    padding: 16,
    gap: 16
  },

  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  vehicleBox: {
    padding: 12,
    borderRadius: 10
  },

  vehicleTitle: {
    fontWeight: "bold",
    marginBottom: 5
  },

  carImage: {
    width: 260,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain"
  },

  quoteBox: {
    padding: 12,
    borderRadius: 10
  },

  quote: {
    fontStyle: "italic",
    textAlign: "center"
  }
});