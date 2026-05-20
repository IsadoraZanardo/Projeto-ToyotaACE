import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

import logoT from "../assets/logoT.png"; // ❗ evita @ se não estiver configurado

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = () => {
    if (loading) return;

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    // simulação de cadastro
    setTimeout(() => {
      login(email, password);

      // ✅ NAVEGAÇÃO CORRETA COM TABS
      router.replace("/(tabs)/dashboard");
    }, 800);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/c84ab249239255.56085275bc31a.png"
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.card}>
          
          <Image source={logoT} style={styles.logo} />

          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>
            Cadastre-se para acompanhar seu veículo
          </Text>

          <TextInput
            placeholder="Seu nome"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="seu@email.com"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TextInput
            placeholder="Confirmar senha"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleRegister}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Criar conta</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.link}>
              Já tem conta? <Text style={styles.linkBold}>Entrar</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 16,
    padding: 20
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 10,
    resizeMode: "contain"
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle: {
    color: "#ddd",
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 12
  },
  button: {
    backgroundColor: "#e11d48",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  link: {
    color: "#fff",
    textAlign: "center",
    marginTop: 15
  },
  linkBold: {
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  error: {
    color: "#ff4d4d",
    textAlign: "center",
    marginBottom: 10
  }
});