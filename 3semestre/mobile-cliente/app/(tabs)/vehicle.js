import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

export default function VehiclePage() {
  const { theme } = useTheme();
  const [activeStep, setActiveStep] = useState(null);

  const vehicleData = {
    modelo: "Corolla Cross XRE",
    ano: "2025",
    motor: "2.0 Flex - 177cv",
    cor: "Branco Pérola",
  };

  const steps = [
    {
      label: "Pedido Realizado",
      done: true,
      description: "Seu pedido foi registrado no sistema.",
    },
    {
      label: "Linha de Produção",
      done: true,
      description: "O veículo entrou na linha de produção.",
    },
    {
      label: "Inspeção",
      done: true,
      description: "Testes de qualidade e segurança.",
    },
    {
      label: "Transporte",
      done: true,
      description: "Veículo a caminho da concessionária.",
    },
    {
      label: "Concessionária",
      done: true,
      description: "Veículo chegou na concessionária.",
    },
    {
      label: "Pronto para Retirada",
      done: true,
      description: "Pode retirar seu carro 🎉",
    },
  ];

  const currentStep = steps.filter((s) => s.done).length;
  const progress = Math.round((currentStep / steps.length) * 100);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Ficha Técnica do Veículo
        </Text>

        <Text style={[styles.subtitle, { color: theme.subtext }]}>
          Acompanhe o processo do seu carro.
        </Text>
      </View>

      {/* CARD VEÍCULO */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          {vehicleData.modelo}
        </Text>

        <View style={styles.grid}>
          <Text style={{ color: theme.subtext }}>Modelo</Text>
          <Text style={{ color: theme.text }}>{vehicleData.modelo}</Text>

          <Text style={{ color: theme.subtext }}>Ano</Text>
          <Text style={{ color: theme.text }}>{vehicleData.ano}</Text>

          <Text style={{ color: theme.subtext }}>Motor</Text>
          <Text style={{ color: theme.text }}>{vehicleData.motor}</Text>

          <Text style={{ color: theme.subtext }}>Cor</Text>
          <Text style={{ color: theme.text }}>{vehicleData.cor}</Text>
        </View>
      </View>

      {/* TIMELINE */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          Timeline de Fabricação
        </Text>

        <Text style={{ color: theme.subtext }}>
          {currentStep} de {steps.length} etapas concluídas
        </Text>

        {/* PROGRESS BAR */}
        <View style={styles.progressBox}>
          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: theme.primary },
              ]}
            />
          </View>

          <Text style={{ color: theme.primary }}>{progress}%</Text>
        </View>

        {/* STEPS */}
        <View style={{ marginTop: 15 }}>
          {steps.map((step, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                setActiveStep(activeStep === i ? null : i)
              }
              style={styles.stepRow}
            >
              {/* ICON + LINE */}
              <View style={styles.iconColumn}>
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor: step.done
                        ? theme.primary
                        : "transparent",
                      borderColor: step.done
                        ? theme.primary
                        : "#999",
                    },
                  ]}
                >
                  {step.done ? (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  ) : (
                    <Ionicons name="ellipse" size={10} color="#999" />
                  )}
                </View>

                {i < steps.length - 1 && (
                  <View
                    style={[
                      styles.line,
                      {
                        backgroundColor: step.done
                          ? theme.primary
                          : "#ccc",
                      },
                    ]}
                  />
                )}
              </View>

              {/* TEXT */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: step.done ? theme.text : theme.subtext,
                    fontWeight: "bold",
                  }}
                >
                  {step.label}
                </Text>

                {/* TOOLTIP FAKE (clicou abre) */}
                {activeStep === i && (
                  <Text style={{ color: theme.subtext, marginTop: 4 }}>
                    {step.description}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
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

  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  grid: {
    gap: 6,
  },

  progressBox: {
    marginTop: 10,
  },

  progressBg: {
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 5,
  },

  progressFill: {
    height: "100%",
  },

  stepRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  iconColumn: {
    alignItems: "center",
  },

  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  line: {
    width: 2,
    height: 30,
    marginTop: 2,
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});