import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Client = {
  id: number;
  name: string;
  phone: string;
};

type Appointment = {
  id: number;
  date: string;
  time: string;
  client: string;
  clientId?: number;
  type: "visita" | "ligacao" | "test-drive";
  description: string;
};

const typeConfig = {
  visita: { label: "📍 Visita", color: "#DC2626" },
  ligacao: { label: "📞 Ligação", color: "#3B82F6" },
  "test-drive": { label: "🚗 Test Drive", color: "#16A34A" },
};

export default function Agenda() {
  const { colors, isDark } = useTheme();

  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [clients] = useState<Client[]>([
    { id: 1, name: "Ana Costa", phone: "(41) 95555-1234" },
    { id: 2, name: "Carlos Santos", phone: "(31) 91234-5678" },
    { id: 3, name: "João Silva", phone: "(11) 98765-4321" },
    { id: 4, name: "Maria Oliveira", phone: "(21) 99876-5432" },
  ].sort((a, b) => a.name.localeCompare(b.name))); // Ordenado A-Z

  const [clientSearch, setClientSearch] = useState("");
  const [showClientList, setShowClientList] = useState(false);

  const [form, setForm] = useState({
    time: "",
    client: "",
    clientId: undefined as number | undefined,
    type: "visita" as Appointment["type"],
    description: "",
  });

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const dayAppointments = appointments
    .filter((a) => a.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const markedDates = appointments.reduce((acc, item) => {
    acc[item.date] = { marked: true, dotColor: "#DC2626" };
    return acc;
  }, {} as any);

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: "#DC2626",
      selectedTextColor: "#fff",
    };
  }

  const selectClient = (client: Client) => {
    setForm((prev) => ({
      ...prev,
      client: client.name,
      clientId: client.id,
    }));
    setClientSearch("");
    setShowClientList(false);
  };

  const handleTimeChange = (text: string) => {
    let clean = text.replace(/[^0-9]/g, "");
    if (clean.length > 4) clean = clean.slice(0, 4);
    if (clean.length >= 3) {
      clean = clean.slice(0, 2) + ":" + clean.slice(2, 4);
    }
    setForm((prev) => ({ ...prev, time: clean }));
  };

  const isValidTime = (time: string): boolean => {
    if (!time || time.length !== 5) return false;
    const [hours, minutes] = time.split(":").map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  };

  const handleSave = () => {
    if (!selectedDate) return Alert.alert("Atenção", "Selecione uma data.");
    if (!form.time || !isValidTime(form.time)) return Alert.alert("Erro", "Horário inválido!");
    if (!form.client.trim()) return Alert.alert("Erro", "Nome do cliente é obrigatório.");

    const newItem: Appointment = {
      id: Date.now(),
      date: selectedDate,
      time: form.time,
      client: form.client.trim(),
      clientId: form.clientId,
      type: form.type,
      description: form.description.trim(),
    };

    setAppointments((prev) => [...prev, newItem]);
    setModalVisible(false);
    setForm({ time: "", client: "", clientId: undefined, type: "visita", description: "" });
  };

  const handleDelete = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Calendário */}
      <View style={{ backgroundColor: colors.background, paddingTop: 8 }}>
        <Calendar
          key={`calendar-${isDark}`}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: colors.text,
            dayTextColor: colors.text,
            monthTextColor: colors.text,
            textDisabledColor: isDark ? "#555555" : "#cccccc",
            todayTextColor: "#DC2626",
            todayBackgroundColor: isDark ? "#374151" : "#f3f4f6",
            selectedDayBackgroundColor: "#DC2626",
            selectedDayTextColor: "#ffffff",
            arrowColor: "#DC2626",
            dotColor: "#DC2626",
          }}
          style={{
            backgroundColor: colors.background,
            marginHorizontal: 8,
            borderRadius: 12,
            paddingBottom: 10,
          }}
        />
      </View>

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Agenda</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#DC2626" }]} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Agendamentos */}
      {dayAppointments.length === 0 ? (
        <Text style={[styles.empty, { color: colors.text }]}>
          {selectedDate ? "Nenhum compromisso para esta data" : "Selecione uma data no calendário"}
        </Text>
      ) : (
        <FlatList
          data={dayAppointments}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16, paddingTop: 8 }}
          renderItem={({ item }) => {
            const config = typeConfig[item.type];
            return (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.row}>
                  <Text style={[styles.time, { color: colors.text }]}>{item.time}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.client, { color: colors.text }]}>{item.client}</Text>
                    <Text style={{ color: config.color, fontWeight: "600" }}>{config.label}</Text>
                    {item.description && <Text style={[styles.desc, { color: colors.text + "80" }]}>{item.description}</Text>}
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={{ color: "#EF4444" }}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* ==================== MODAL PRINCIPAL ==================== */}
      <Modal visible={modalVisible} animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Novo Agendamento</Text>

            <TextInput
              placeholder="Horário (HH:MM)"
              placeholderTextColor={colors.text + "70"}
              style={[styles.input, { color: colors.text, borderColor: colors.text + "30", backgroundColor: colors.card }]}
              value={form.time}
              onChangeText={handleTimeChange}
              keyboardType="numeric"
              maxLength={5}
            />

            {/* === CAMPO DE CLIENTE COM PESQUISA DIRETA === */}
            <TextInput
              placeholder="Buscar cliente..."
              placeholderTextColor={colors.text + "70"}
              style={[styles.input, { color: colors.text, borderColor: colors.text + "30", backgroundColor: colors.card }]}
              value={clientSearch}
              onChangeText={setClientSearch}
              onFocus={() => setShowClientList(true)}
            />

            {/* Lista de clientes filtrados */}
            {showClientList && (
              <View style={{ maxHeight: 250, marginBottom: 12 }}>
                <FlatList
                  data={filteredClients}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.clientItem, { backgroundColor: colors.card }]}
                      onPress={() => selectClient(item)}
                    >
                      <Text style={[styles.clientName, { color: colors.text }]}>{item.name}</Text>
                      <Text style={{ color: colors.text + "70" }}>{item.phone}</Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <Text style={{ textAlign: "center", padding: 20, color: colors.text + "60" }}>
                      Nenhum cliente encontrado
                    </Text>
                  }
                />
              </View>
            )}

            {/* Nome do cliente selecionado */}
            {form.client ? (
              <Text style={{ color: colors.text, marginBottom: 12, fontWeight: "600" }}>
                Selecionado: {form.client}
              </Text>
            ) : null}

            {/* Tipo de Agendamento */}
            <View style={styles.typeContainer}>
              {Object.entries(typeConfig).map(([key, value]) => {
                const isActive = form.type === key;
                return (
                  <TouchableOpacity
                    key={key}
                    style={[styles.typeButton, { borderColor: value.color, backgroundColor: isActive ? value.color : "transparent" }]}
                    onPress={() => setForm((prev) => ({ ...prev, type: key as Appointment["type"] }))}
                  >
                    <Text style={{ color: isActive ? "#fff" : value.color, fontWeight: "600" }}>
                      {value.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TextInput
              placeholder="Descrição (opcional)"
              placeholderTextColor={colors.text + "70"}
              style={[styles.input, { height: 80, textAlignVertical: "top", color: colors.text, borderColor: colors.text + "30", backgroundColor: colors.card }]}
              multiline
              value={form.description}
              onChangeText={(t) => setForm({ ...form, description: t })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: colors.text, fontSize: 17 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text style={{ color: "#DC2626", fontSize: 17, fontWeight: "bold" }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: { fontSize: 22, fontWeight: "bold" },
  button: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16 },

  card: { padding: 16, borderRadius: 12, marginBottom: 12 },
  row: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  time: { width: 60, fontWeight: "bold", fontSize: 17 },
  client: { fontWeight: "600", fontSize: 16.5 },
  desc: { fontSize: 13.5, marginTop: 6 },

  modalContainer: { flex: 1, padding: 20, paddingTop: Platform.OS === "ios" ? 60 : 40 },
  modalTitle: { fontSize: 22, marginBottom: 20, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  typeContainer: { flexDirection: "row", gap: 10, marginBottom: 16 },
  typeButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clientItem: {
    padding: 14,
    marginVertical: 4,
    borderRadius: 10,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "600",
  },
});