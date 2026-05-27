import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function Login() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const senhaRef = useRef<any>(null);

  function validarEmail(valor: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!valor) {
      setErroEmail("Digite um e-mail");
      return false;
    }

    if (!regex.test(valor)) {
      setErroEmail("E-mail inválido");
      return false;
    }

    setErroEmail("");
    return true;
  }

  async function handleLogin() {
    Keyboard.dismiss();

    const emailValido = validarEmail(email);

    if (!emailValido || !senha) {
      Alert.alert("Erro", "Preencha os campos corretamente");
      return;
    }

    setLoading(true);

    try {
      // 🔥 FUTURO BACKEND AQUI
      // const response = await fetch("SUA_API/login", {...})

      // Simulação rápida
      setTimeout(() => {
        router.replace("/(tabs)");
        setLoading(false);
      }, 800);

    } catch (error) {
      Alert.alert("Erro", "Falha ao fazer login");
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          source={require("@/assets/images/login-bg.jpg")}
          style={styles.background}
          blurRadius={isDark ? 6 : 2}
        >
          <View style={styles.container}>

            {/* LOGO */}
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/toyota_logo.png")}
                style={styles.logo}
              />
              <Text style={styles.logoText}>TOYOTA ACE</Text>
            </View>

            {/* CARD */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: isDark
                    ? "rgba(30,41,59,0.85)"
                    : "rgba(255,255,255,0.9)",
                },
              ]}
            >
              <Text style={[styles.title, { color: colors.text }]}>
                Login
              </Text>

              <Text style={[styles.subtitle, { color: colors.subtext }]}>
                Digite seus dados
              </Text>

              {/* EMAIL */}
              <TextInput
                placeholder="Digite seu e-mail"
                placeholderTextColor={colors.subtext}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => senhaRef.current?.focus()}
                onChangeText={(text) => {
                  const clean = text.trim();
                  setEmail(clean);
                  validarEmail(clean);
                }}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.input,
                    color: colors.text,
                    borderColor: erroEmail ? "#DC2626" : "transparent",
                  },
                ]}
              />

              {erroEmail ? (
                <Text style={styles.erroTexto}>{erroEmail}</Text>
              ) : null}

              {/* SENHA */}
              <TextInput
                ref={senhaRef}
                placeholder="Digite sua senha"
                placeholderTextColor={colors.subtext}
                secureTextEntry
                value={senha}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                onChangeText={setSenha}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.input,
                    color: colors.text,
                  },
                ]}
              />

              {/* BOTÃO */}
              <TouchableOpacity
                onPress={handleLogin}
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.primary,
                    opacity:
                      !email || !!erroEmail || !senha || loading ? 0.6 : 1,
                  },
                ]}
                disabled={!email || !!erroEmail || !senha || loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Entrando..." : "Entrar"}
                </Text>
              </TouchableOpacity>

              {/* LINKS */}
              <TouchableOpacity onPress={() => router.push("/recuperar")}>
                <Text style={[styles.link, { color: colors.text }]}>
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/cadastro")}>
                <Text style={[styles.linkBottom, { color: colors.text }]}>
                  Criar conta
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },

  logoText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },

  card: {
    width: "100%",
    maxWidth: 400,
    padding: 25,
    borderRadius: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },

  subtitle: {
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },

  erroTexto: {
    color: "#DC2626",
    marginBottom: 10,
    fontSize: 12,
  },

  button: {
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 15,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    marginBottom: 10,
  },

  linkBottom: {
    textAlign: "center",
    marginTop: 10,
  },
});