import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image, Linking, SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");

export default function LandingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carImages = [
    require("../assets/hilux.png"),
    require("../assets/corolla.png"),
    require("../assets/yarisseda.png"),
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carImages.length - 1 : prev - 1
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        {/* NAVBAR */}
        <View style={styles.nav}>
          <View style={styles.navLeft}>
            <Image source={require("../assets/logoT.png")} style={styles.logo} />
            <Text style={styles.logoText}>TOYOTA ACE</Text>
          </View>

          <View style={styles.navRight}>
          <TouchableOpacity
  onPress={() =>
    Linking.openURL("https://www.toyota.com.br/meu-toyota/garantia-toyota-10")
  }
>
  <Text style={styles.navText}>Garantia Toyota 10</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => router.push("/login")}>
  <Text style={[styles.navText, { color: "#ef4444" }]}>
    Login
  </Text>
</TouchableOpacity>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.redShape} />
          <View style={styles.blueShape} />

          <View style={styles.heroText}>
            <Text style={styles.title}>TOYOTA ACE</Text>
            <Text style={styles.subtitle}>
              ACESSIBILIDADE{"\n"}
              CONECTIVIDADE{"\n"}
              EXPERIÊNCIA
            </Text>
          </View>
        </View>

        {/* HISTÓRIA */}
        <View style={styles.section}>
          <View style={styles.carousel}>

            <TouchableOpacity onPress={prevSlide}>
              <Text style={styles.arrow}>◀</Text>
            </TouchableOpacity>

            <Image source={carImages[currentSlide]} style={styles.carImage} />

            <TouchableOpacity onPress={nextSlide}>
              <Text style={styles.arrow}>▶</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.textBox}>
            <Text style={styles.sectionTitle}>A História da Toyota</Text>

            <Text style={styles.text}>
              Fundada em 1937, a Toyota revolucionou a indústria automotiva com inovação,
              qualidade e tecnologia sustentável.
            </Text>

            <Text style={styles.text}>
              Dos clássicos aos híbridos e elétricos, a Toyota continua moldando
              o futuro da mobilidade.
            </Text>
          </View>
        </View>

        {/* BENEFÍCIOS */}
        <View style={styles.sectionLight}>
          <Text style={styles.sectionTitleDark}>
            Por que usar o aplicativo?
          </Text>

          <Text style={styles.textDark}>
            Acompanhe seu carro em tempo real com uma experiência simples e rápida.
          </Text>

          <View style={styles.pillars}>
            <Text style={styles.pillar}>• Acessibilidade</Text>
            <Text style={styles.pillar}>• Conectividade</Text>
            <Text style={styles.pillar}>• Experiência</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.buttonText}>Começar agora</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Toyota do Brasil
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },

  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#000",
    borderBottomWidth: 3,
    borderBottomColor: "#ef4444",
  },

  navLeft: {
  
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },

  navRight: {
    flexDirection: "row",
    gap: 16,
  },

  logo: {
    
    top:2,
    width: 35,
    height: 30,
  },

  logoText: {
    marginTop:24,
    color: "#fff",
    fontWeight: "bold",
  },

  navText: {
    marginTop:24,
    color: "#fff",
    fontSize: 12,
  },

  hero: {
    height: 260,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  redShape: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: 120,
    backgroundColor: "#ef4444",
    transform: [{ rotate: "-20deg" }],
  },

  blueShape: {
    position: "absolute",
    bottom: -40,
    left: -20,
    width: width,
    height: 200,
    backgroundColor: "#0f2a44",
    transform: [{ rotate: "-15deg" }],
    borderRadius: 20,
  },

  heroText: {
    zIndex: 2,
  },

  title: {
    marginTop:24,
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#ffffff",
    fontSize: 20,
    marginTop: 10,
  },

  section: {
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  carousel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  carImage: {
    width: width * 0.6,
    height: 140,
    resizeMode: "contain",
  },

  arrow: {
    fontSize: 20,
  },

  textBox: {
    marginTop: 20,
  },

  sectionTitle: {
    color: "#ef4444",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    color: "#333",
    marginBottom: 8,
  },

  sectionLight: {
    padding: 20,
    backgroundColor: "#fff",
  },

  sectionTitleDark: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  textDark: {
    color: "#555",
  },

  pillars: {
    marginVertical: 10,
  },

  pillar: {
    color: "#ef4444",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
  },

  footer: {
    textAlign: "center",
    color: "#aaa",
    padding: 20,
    backgroundColor: "#000",
  },
});