import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { api, endpoints } from "@/services/api";

type BackendVeiculo = {
  id: number;
  modeloVeiculo?: string;
  marcaVeiculo?: string;
  anoVeiculo?: string;
  corVeiculo?: string;
  statusVeiculo?: string;
  valorTotal?: number;
};

type BackendCliente = {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  veiculos?: BackendVeiculo[];
};

type BackendAgendamento = {
  id: number;
  data: string;
  horario: string;
  tipoServico: string;
  observacao?: string;
  status?: string;
  cliente?: BackendCliente;
};

const catalogVehicles = [
  {
    id: 1,
    name: "Corolla Cross",
    price: "R$ 189.990",
    image: require("../../assets/images/corolla-cross.png"),
  },
  {
    id: 2,
    name: "Corolla Sedan",
    price: "R$ 179.990",
    image: require("../../assets/images/corolla-sedan.png"),
  },
  {
    id: 3,
    name: "Yaris Sedan",
    price: "R$ 129.990",
    image: require("../../assets/images/yaris-sedan.png"),
  },
  {
    id: 4,
    name: "Yaris Hatch",
    price: "R$ 109.990",
    image: require("../../assets/images/yaris-hatch.png"),
  },
  {
    id: 5,
    name: "Yaris Cross",
    price: "R$ 149.990",
    image: require("../../assets/images/yaris-cross.png"),
  },
  {
    id: 6,
    name: "Hilux",
    price: "R$ 299.990",
    image: require("../../assets/images/hilux.png"),
  },
];

const salesData = [
  { month: "Out", vendas: 8 },
  { month: "Nov", vendas: 12 },
  { month: "Dez", vendas: 15 },
  { month: "Jan", vendas: 10 },
  { month: "Fev", vendas: 14 },
  { month: "Mar", vendas: 11 },
];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function formatDateLong() {
  return new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isCurrentMonth(dateString?: string) {
  if (!dateString) return false;

  const date = new Date(dateString);
  const today = new Date();

  if (Number.isNaN(date.getTime())) return false;

  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default function Dashboard() {
  const { colors } = useTheme();
  const authContext = useAuth();

  const user = authContext?.user;

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<BackendCliente[]>([]);
  const [appointments, setAppointments] = useState<BackendAgendamento[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarDashboard();
    }, [])
  );

  async function carregarDashboard() {
    try {
      setLoading(true);

      const [clientesResponse, agendamentosResponse] = await Promise.all([
        api.get<BackendCliente[]>(endpoints.clientes),
        api.get<BackendAgendamento[]>(endpoints.agendamentos),
      ]);

      setClients(clientesResponse);
      setAppointments(agendamentosResponse);
    } catch (error) {
      console.log("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  const totalClientes = clients.length;

  const clientesComVeiculo = clients.filter(
    (client) => (client.veiculos || []).length > 0
  ).length;

  const leads = clients.filter((client) => {
    return !client.veiculos || client.veiculos.length === 0;
  }).length;

  const veiculosVendidos = clients.reduce((total, client) => {
    return total + (client.veiculos || []).length;
  }, 0);

  const agendamentosHoje = appointments.filter(
    (appointment) => appointment.data === todayISO()
  ).length;

  const agendamentosMes = appointments.filter((appointment) =>
    isCurrentMonth(appointment.data)
  ).length;

  const taxaConversao =
    totalClientes > 0 ? Math.round((clientesComVeiculo / totalClientes) * 100) : 0;

  const metrics = useMemo(
    () => [
      {
        label: "Vendas do mês",
        value: String(veiculosVendidos),
        change: `${agendamentosHoje} agendamento(s) hoje`,
        icon: "trending-up-outline",
      },
      {
        label: "Veículos disponíveis",
        value: String(catalogVehicles.length),
        change: "no catálogo",
        icon: "car-sport-outline",
      },
      {
        label: "Clientes ativos",
        value: String(totalClientes),
        change: `${leads} lead(s)`,
        icon: "people-outline",
      },
      {
        label: "Taxa de conversão",
        value: `${taxaConversao}%`,
        change: `${clientesComVeiculo} cliente(s) com veículo`,
        icon: "radio-button-on-outline",
      },
    ],
    [
      veiculosVendidos,
      agendamentosHoje,
      totalClientes,
      leads,
      taxaConversao,
      clientesComVeiculo,
    ]
  );

  const chartMax = Math.max(...salesData.map((item) => item.vendas), 1);

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={[styles.loadingText, { color: colors.subtext }]}>
          Carregando dashboard...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Bom dia, {user?.nome || user?.name || "Vendedor"}
          </Text>

          <Text style={[styles.subtitle, { color: colors.subtext }]}>
            Toyota Centro · {formatDateLong()}
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((metric) => (
            <View
              key={metric.label}
              style={[
                styles.metricCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.metricHeader}>
                <Text style={[styles.metricLabel, { color: colors.subtext }]}>
                  {metric.label}
                </Text>

                <View
                  style={[
                    styles.metricIconBox,
                    { backgroundColor: "rgba(230,0,18,0.12)" },
                  ]}
                >
                  <Ionicons
                    name={metric.icon as keyof typeof Ionicons.glyphMap}
                    size={15}
                    color={colors.primary}
                  />
                </View>
              </View>

              <Text style={[styles.metricValue, { color: colors.text }]}>
                {metric.value}
              </Text>

              <Text style={[styles.metricChange, { color: colors.subtext }]}>
                {metric.change}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Destaques da loja
            </Text>

            <View style={styles.carouselButtons}>
              <View
                style={[styles.arrowButton, { backgroundColor: colors.box }]}
              >
                <Ionicons
                  name="chevron-back"
                  size={15}
                  color={colors.subtext}
                />
              </View>

              <View
                style={[styles.arrowButton, { backgroundColor: colors.box }]}
              >
                <Ionicons
                  name="chevron-forward"
                  size={15}
                  color={colors.subtext}
                />
              </View>
            </View>
          </View>

          <FlatList
            data={catalogVehicles}
            horizontal
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.featuredCard,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.input,
                  },
                ]}
              >
                <View style={styles.featuredImageBox}>
                  <Image source={item.image} style={styles.featuredImage} />
                </View>

                <View style={styles.featuredInfo}>
                  <Text
                    numberOfLines={1}
                    style={[styles.featuredName, { color: colors.text }]}
                  >
                    {item.name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={[styles.featuredPrice, { color: colors.primary }]}
                  >
                    {item.price}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>

        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Resumo de hoje
            </Text>

            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.primary}
            />
          </View>

          <View style={styles.todayGrid}>
            <View
              style={[
                styles.todayBox,
                { backgroundColor: colors.input, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.todayValue, { color: colors.text }]}>
                {agendamentosHoje}
              </Text>

              <Text style={[styles.todayLabel, { color: colors.subtext }]}>
                Agendamentos hoje
              </Text>
            </View>

            <View
              style={[
                styles.todayBox,
                { backgroundColor: colors.input, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.todayValue, { color: colors.text }]}>
                {agendamentosMes}
              </Text>

              <Text style={[styles.todayLabel, { color: colors.subtext }]}>
                Agendamentos no mês
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Desempenho de vendas
          </Text>

          <View style={styles.customChart}>
            <View style={styles.chartScale}>
              {[15, 10, 5, 0].map((value) => (
                <Text
                  key={value}
                  style={[styles.scaleText, { color: colors.subtext }]}
                >
                  {value}
                </Text>
              ))}
            </View>

            <View style={styles.chartContent}>
              <View style={styles.gridLines}>
                {[0, 1, 2, 3].map((item) => (
                  <View
                    key={item}
                    style={[
                      styles.gridLine,
                      { backgroundColor: "rgba(255,255,255,0.06)" },
                    ]}
                  />
                ))}
              </View>

              <View style={styles.barsArea}>
                {salesData.map((item) => {
                  const heightPercent = (item.vendas / chartMax) * 100;

                  return (
                    <View key={item.month} style={styles.barColumn}>
                      <View style={styles.barWrapper}>
                        <View
                          style={[
                            styles.bar,
                            {
                              height: `${heightPercent}%`,
                              backgroundColor: colors.primary,
                            },
                          ]}
                        />
                      </View>

                      <Text
                        style={[styles.barLabel, { color: colors.subtext }]}
                      >
                        {item.month}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

         
        </View>

        <Text style={[styles.footer, { color: colors.subtext }]}>
          © {new Date().getFullYear()} Toyota do Brasil
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 120,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 13,
  },

  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
    rowGap: 12,
  },

  metricCard: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    minHeight: 104,
  },

  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 8,
  },

  metricLabel: {
    flex: 1,
    fontSize: 11,
    lineHeight: 15,
  },

  metricIconBox: {
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
  },

  metricChange: {
    marginTop: 5,
    fontSize: 11,
  },

  sectionCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    overflow: "hidden",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  carouselButtons: {
    flexDirection: "row",
    gap: 6,
  },

  arrowButton: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  featuredList: {
    gap: 10,
    paddingRight: 12,
  },

  featuredCard: {
    width: 132,
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
  },

  featuredImageBox: {
    height: 74,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  featuredImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  featuredInfo: {
    padding: 9,
  },

  featuredName: {
    fontSize: 12,
    fontWeight: "bold",
  },

  featuredPrice: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "bold",
  },

  todayGrid: {
    flexDirection: "row",
    gap: 10,
  },

  todayBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },

  todayValue: {
    fontSize: 24,
    fontWeight: "bold",
  },

  todayLabel: {
    marginTop: 4,
    fontSize: 12,
  },

  customChart: {
    marginTop: 18,
    flexDirection: "row",
  },

  chartScale: {
    width: 26,
    height: 200,
    justifyContent: "space-between",
    paddingBottom: 22,
  },

  scaleText: {
    fontSize: 11,
    textAlign: "right",
  },

  chartContent: {
    flex: 1,
    position: "relative",
  },

  gridLines: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 178,
    justifyContent: "space-between",
  },

  gridLine: {
    height: 1,
    width: "100%",
  },

  barsArea: {
    height: 200,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: 8,
  },

  barColumn: {
    flex: 1,
    alignItems: "center",
  },

  barWrapper: {
    height: 170,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },

  bar: {
    width: 24,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  barLabel: {
    fontSize: 11,
    marginTop: 8,
  },

  chartHint: {
    marginTop: 8,
    fontSize: 11,
    lineHeight: 16,
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
});