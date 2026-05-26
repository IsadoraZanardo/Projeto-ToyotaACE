import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/ThemeContext";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

//////////////////////////////
// 🔥 DADOS (SIMULA BACKEND)
//////////////////////////////

const dashboardData = {
  sales: [
    { month: "Jan", vendas: 5 },
    { month: "Fev", vendas: 10 },
    { month: "Mar", vendas: 8 },
    { month: "Abr", vendas: 15 },
  ],

  vehicles: [
    {
      id: 1,
      name: "Corolla Sedan",
      price: "R$ 120.000",
      image: require("../../assets/images/corolla-sedan.png"),
    },
    {
      id: 2,
      name: "Hilux",
      price: "R$ 250.000",
      image: require("../../assets/images/hilux.png"),
    },
    {
      id: 3,
      name: "Corolla Cross",
      price: "R$ 150.000",
      image: require("../../assets/images/corolla-cross.png"),
    },
    {
      id: 4,
      name: "Yaris Cross",
      price: "R$ 110.000",
      image: require("../../assets/images/yaris-cross.png"),
    },
    {
      id: 5,
      name: "Yaris Hatch",
      price: "R$ 95.000",
      image: require("../../assets/images/yaris-hatch.png"),
    },
    {
      id: 6,
      name: "Yaris Sedan",
      price: "R$ 105.000",
      image: require("../../assets/images/yaris-sedan.png"),
    },
  ],
};

export default function Dashboard() {
  const { colors, isDark, toggleTheme } = useTheme();

  //////////////////////////////
  // 🔥 PREPARADO PARA BACKEND
  //////////////////////////////

  const salesData = dashboardData.sales;
  const vehicles = dashboardData.vehicles;

  const totalVendas = salesData.reduce(
    (acc, item) => acc + item.vendas,
    0
  );

  const totalClientes = totalVendas * 2;

  const taxaConversao = Math.round(
    (totalVendas / totalClientes) * 100
  );

  //////////////////////////////

  const chartBg = isDark ? "#0F172A" : "#FFFFFF";
  const labelColor = isDark ? "#CBD5F5" : "#334155";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER LIMPO */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Dashboard
          </Text>

          <TouchableOpacity onPress={toggleTheme} style={styles.iconBtn}>
            <Text style={styles.icon}>
              {isDark ? "🌙" : "☀️"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* CARDS */}
        <View style={styles.cards}>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.subtext }}>Vendas</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {totalVendas}
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.subtext }}>Clientes</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {totalClientes}
            </Text>
          </View>
        </View>

        {/* CONVERSÃO */}
        <View style={styles.cards}>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.subtext }}>Conversão</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {taxaConversao}%
            </Text>
          </View>
        </View>

        {/* DESTAQUES */}
        <Text style={[styles.section, { color: colors.text }]}>
          Destaques
        </Text>

        <FlatList
          data={vehicles}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.car, { backgroundColor: colors.card }]}
            >
              <Image source={item.image} style={styles.img} />
              <Text style={{ color: colors.text }}>{item.name}</Text>
              <Text style={{ color: colors.primary }}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />

        {/* GRÁFICO */}
        <Text style={[styles.section, { color: colors.text }]}>
          Vendas Mensais
        </Text>

        <BarChart
          data={{
            labels: salesData.map((item) => item.month),
            datasets: [
              {
                data: salesData.map((item) => item.vendas),
              },
            ],
          }}
          width={screenWidth - 30}
          height={240}
          fromZero
          showValuesOnTopOfBars
          withInnerLines={false}
          chartConfig={{
            backgroundColor: chartBg,
            backgroundGradientFrom: chartBg,
            backgroundGradientTo: chartBg,
            decimalPlaces: 0,
            color: () => "#DC2626",
            labelColor: () => labelColor,
            propsForBackgroundLines: {
              strokeWidth: 0,
            },
            barPercentage: 0.8,
          }}
          style={styles.chart}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

//////////////////////////////
// 🎨 ESTILOS
//////////////////////////////

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 22,
  },

  cards: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
  },

  card: {
    padding: 20,
    borderRadius: 16,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },

  value: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },

  section: {
    margin: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  car: {
    width: 150,
    padding: 10,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },

  img: {
    width: "100%",
    height: 90,
    borderRadius: 12,
    marginBottom: 5,
    resizeMode: "cover",
  },

  chart: {
    marginHorizontal: 15,
    borderRadius: 20,
    marginBottom: 30,
  },
});