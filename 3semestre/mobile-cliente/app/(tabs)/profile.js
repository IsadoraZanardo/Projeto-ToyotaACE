import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAuth } from "../../contexts/AuthContext";
import { usePurchases } from "../../contexts/PurchasesContext";
import { useTheme } from "../../contexts/ThemeContext";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function paymentLabel(method) {
  const labels = {
    pix: "Pix",
    credito: "Cartão de crédito",
    debito: "Cartão de débito",
    boleto: "Boleto",
  };

  return labels[method] || method;
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { purchases } = usePurchases();
  const { theme } = useTheme();
  const router = useRouter();

  const dadosBanco = {
    nome: "Rayan Teixeira",
    cpf: "123.456.789-00",
    modeloVeiculo: "Corolla Cross XRE 2025",
    statusVeiculo: "EM PRODUÇÃO",
  };

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Perfil do Cliente
        </Text>

        <Text style={[styles.subtitle, { color: theme.subtext }]}>
          Visualize suas informações, dados do veículo e compras realizadas.
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Dados Pessoais
          </Text>

          <View style={styles.row}>
            <Ionicons name="person" size={20} color={theme.primary} />
            <View style={styles.infoBox}>
              <Text style={[styles.label, { color: theme.subtext }]}>
                Nome
              </Text>
              <Text style={[styles.value, { color: theme.text }]}>
                {dadosBanco.nome || user?.name || "Não informado"}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons name="mail" size={20} color={theme.primary} />
            <View style={styles.infoBox}>
              <Text style={[styles.label, { color: theme.subtext }]}>
                Email
              </Text>
              <Text style={[styles.value, { color: theme.text }]}>
                {user?.email || "Não informado"}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons name="card" size={20} color={theme.primary} />
            <View style={styles.infoBox}>
              <Text style={[styles.label, { color: theme.subtext }]}>
                CPF
              </Text>
              <Text style={[styles.value, { color: theme.text }]}>
                {dadosBanco.cpf}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Veículo Vinculado
          </Text>

          <View style={styles.row}>
            <Ionicons name="car" size={24} color={theme.primary} />

            <View style={styles.infoBox}>
              <Text style={[styles.value, { color: theme.text }]}>
                {dadosBanco.modeloVeiculo}
              </Text>

              <Text style={[styles.status, { color: theme.primary }]}>
                Status: {dadosBanco.statusVeiculo}
              </Text>

              <Text style={[styles.subinfo, { color: theme.subtext }]}>
                Branco Pérola • 2.0 Flex
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Histórico de Compras
            </Text>

            <View style={[styles.badge, { backgroundColor: theme.primary }]}>
              <Text style={styles.badgeText}>{purchases.length}</Text>
            </View>
          </View>

          {purchases.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons
                name="bag-outline"
                size={32}
                color={theme.subtext}
              />

              <Text style={[styles.emptyText, { color: theme.subtext }]}>
                Nenhuma compra realizada ainda.
              </Text>
            </View>
          ) : (
            purchases.map((purchase) => (
              <View
                key={purchase.id}
                style={[
                  styles.purchaseBox,
                  { borderColor: theme.box },
                ]}
              >
                <View style={styles.purchaseHeader}>
                  <View>
                    <Text style={[styles.value, { color: theme.text }]}>
                      Compra #{purchase.id}
                    </Text>

                    <Text style={[styles.subinfo, { color: theme.subtext }]}>
                      Data: {purchase.date}
                    </Text>
                  </View>

                  <Text style={[styles.purchaseTotal, { color: theme.primary }]}>
                    {formatPrice(purchase.total)}
                  </Text>
                </View>

                <View style={styles.paymentRow}>
                  <Ionicons name="card-outline" size={16} color={theme.primary} />
                  <Text style={[styles.subinfo, { color: theme.subtext }]}>
                    Pagamento: {paymentLabel(purchase.paymentMethod)}
                  </Text>
                </View>

                <View style={styles.itemsBox}>
                  {purchase.items.map((item) => (
                    <Text
                      key={`${purchase.id}-${item.id}`}
                      style={[styles.itemText, { color: theme.subtext }]}
                    >
                      • {item.name} x{item.quantity}
                    </Text>
                  ))}
                </View>
              </View>
            ))
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: "#ef4444" }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <Text style={[styles.footer, { color: theme.subtext }]}>
        © {new Date().getFullYear()} Toyota do Brasil
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
  },

  grid: {
    gap: 12,
  },

  card: {
    padding: 16,
    borderRadius: 14,
  },

  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  badge: {
    minWidth: 26,
    height: 26,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  infoBox: {
    flex: 1,
  },

  label: {
    fontSize: 12,
  },

  value: {
    fontSize: 14,
    fontWeight: "bold",
  },

  status: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 2,
  },

  subinfo: {
    fontSize: 12,
    marginTop: 2,
  },

  emptyBox: {
    alignItems: "center",
    paddingVertical: 24,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
  },

  purchaseBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },

  purchaseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },

  purchaseTotal: {
    fontSize: 14,
    fontWeight: "bold",
  },

  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },

  itemsBox: {
    marginTop: 8,
  },

  itemText: {
    fontSize: 12,
    marginTop: 3,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
});