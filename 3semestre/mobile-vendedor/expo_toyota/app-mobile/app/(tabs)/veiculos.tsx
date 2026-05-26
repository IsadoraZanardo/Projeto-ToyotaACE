import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/ThemeContext";

const vehicles = [
  { id: 1, name: "Corolla Sedan", price: "R$ 120.000", image: require("../../assets/images/corolla-sedan.png") },
  { id: 2, name: "Hilux", price: "R$ 250.000", image: require("../../assets/images/hilux.png") },
  { id: 3, name: "Corolla Cross", price: "R$ 150.000", image: require("../../assets/images/corolla-cross.png") },
  { id: 4, name: "Yaris Cross", price: "R$ 110.000", image: require("../../assets/images/yaris-cross.png") },
  { id: 5, name: "Yaris Hatch", price: "R$ 95.000", image: require("../../assets/images/yaris-hatch.png") },
  { id: 6, name: "Yaris Sedan", price: "R$ 105.000", image: require("../../assets/images/yaris-sedan.png") },
];

export default function Veiculos() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  // Ajuste de colunas para Desktop, Tablet e Mobile
  const numColumns = width > 1200 ? 4 : width > 800 ? 3 : width > 500 ? 2 : 1;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Container de largura máxima para o Título */}
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          Veículos
        </Text>
      </View>

      <FlatList
        data={vehicles}
        key={numColumns} // Força o re-render ao mudar o número de colunas
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        columnWrapperStyle={numColumns > 1 ? styles.row : null}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.img} />
            </View>

            <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
              {item.name}
            </Text>

            <Text style={styles.price}>
              {item.price}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    maxWidth: 1200, // Centraliza o título junto com a lista
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    padding: 12,
    width: "100%",
    maxWidth: 1200, // 🔥 ISSO resolve o problema no Desktop
    alignSelf: "center", // 🔥 Centraliza a lista na tela grande
  },
  row: {
    justifyContent: "flex-start", // Evita que os itens fiquem muito longe um do outro
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
    maxWidth: 400, // 🔥 Impede o card de esticar demais individualmente
    // Sombra
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#f5f5f5", // Fundo neutro caso a imagem demore a carregar
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // 🔥 Mudei para 'contain' para não cortar as rodas/teto do carro
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 12,
    marginTop: 12,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    paddingHorizontal: 12,
    marginBottom: 15,
    color: "#DC2626",
  },
});