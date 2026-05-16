import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { useTheme } from "../../contexts/ThemeContext";

export default function FinancingPage() {
  const { theme } = useTheme();

  const financing = {
    valorTotal: 189990,
    entrada: 50000,
    parcelas: 48,
    taxa: 1.29,
    valorParcela: 3845.62,
  };

  const fmt = (v) =>
    v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Simulação de Financiamento
        </Text>

        <Text style={[styles.subtitle, { color: theme.subtext }]}>
          Veja os detalhes do financiamento do seu veículo.
        </Text>
      </View>

      {/* CARDS */}
      <View style={styles.grid}>

        {/* VALOR TOTAL */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.subtext }]}>
            💰 Valor Total
          </Text>

          <Text style={[styles.cardMain, { color: theme.text }]}>
            {fmt(financing.valorTotal)}
          </Text>

          <Text style={[styles.cardSub, { color: theme.subtext }]}>
            Corolla Cross XRE 2025
          </Text>
        </View>

        {/* ENTRADA */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.subtext }]}>
            💳 Entrada
          </Text>

          <Text style={[styles.cardMain, { color: theme.text }]}>
            {fmt(financing.entrada)}
          </Text>

          <Text style={[styles.cardSub, { color: theme.subtext }]}>
            {(
              (financing.entrada / financing.valorTotal) *
              100
            ).toFixed(0)}
            % do valor
          </Text>
        </View>

        {/* PARCELAS */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.subtext }]}>
            📅 Parcelas
          </Text>

          <Text style={[styles.cardMain, { color: theme.text }]}>
            {financing.parcelas}x de{" "}
            {fmt(financing.valorParcela)}
          </Text>

          <Text style={[styles.cardSub, { color: theme.subtext }]}>
            Financiado:{" "}
            {fmt(financing.valorTotal - financing.entrada)}
          </Text>
        </View>

        {/* JUROS */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.subtext }]}>
            📊 Taxa de Juros
          </Text>

          <Text style={[styles.cardMain, { color: theme.text }]}>
            {financing.taxa}% a.m.
          </Text>

          <Text style={[styles.cardSub, { color: theme.subtext }]}>
            {(financing.taxa * 12).toFixed(2)}% ao ano
          </Text>
        </View>

      </View>

      {/* FOOTER */}
      <Text style={[styles.footer, { color: theme.subtext }]}>
        © {new Date().getFullYear()} Toyota do Brasil
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 5,
  },

  grid: {
    gap: 12,
  },

  card: {
    padding: 16,
    borderRadius: 12,
  },

  cardTitle: {
    marginBottom: 6,
  },

  cardMain: {
    fontSize: 18,
    fontWeight: "bold",
  },

  cardSub: {
    marginTop: 4,
  },

  footer: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
});