import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const dates = [
  "01/05/2026",
  "02/05/2026",
  "03/05/2026",
  "04/05/2026",
  "05/05/2026",
];

const serviceTypes = [
  {
    id: "retirada",
    label: "Retirada",
    icon: "checkmark-circle-outline",
  },
  {
    id: "revisao",
    label: "Revisão",
    icon: "car-sport-outline",
  },
  {
    id: "recall",
    label: "Recall",
    icon: "warning-outline",
  },
  {
    id: "outros",
    label: "Outros",
    icon: "location-outline",
  },
];

export default function SchedulingPage() {
  const { theme } = useTheme();

  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [serviceType, setServiceType] = useState("retirada");
  const [appointments, setAppointments] = useState([]);

  const selectedService = serviceTypes.find((item) => item.id === serviceType);

  const appointmentsByDate = appointments.filter(
    (item) => item.date === selectedDate
  );

  const handleConfirm = () => {
    if (!selectedDate || !time) {
      Alert.alert("Atenção", "Escolha uma data e um horário.");
      return;
    }

    const alreadyExists = appointments.some(
      (item) => item.date === selectedDate && item.time === time
    );

    if (alreadyExists) {
      Alert.alert("Horário ocupado", "Esse horário já foi agendado.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      date: selectedDate,
      time,
      type: serviceType,
      label: selectedService.label,
      icon: selectedService.icon,
      description: `Agendamento de ${selectedService.label} realizado pelo app Toyota ACE`,
    };

    setAppointments((prev) => [...prev, newAppointment]);

    Alert.alert("Sucesso", "Agendamento confirmado!");

    setTime("");
  };

  const handleDelete = (id) => {
    Alert.alert("Excluir agendamento", "Deseja remover este agendamento?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setAppointments((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Agenda</Text>

          <Text style={[styles.subtitle, { color: theme.subtext }]}>
            Escolha a data e horário para seu atendimento.
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          Novo agendamento
        </Text>

        <Text style={[styles.label, { color: theme.text }]}>Tipo de serviço</Text>

        <View style={styles.rowWrap}>
          {serviceTypes.map((item) => {
            const selected = serviceType === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.serviceOption,
                  { backgroundColor: theme.box },
                  selected && { backgroundColor: theme.primary },
                ]}
                onPress={() => setServiceType(item.id)}
              >
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={selected ? "#fff" : theme.text}
                />

                <Text
                  style={[
                    styles.optionText,
                    { color: theme.text },
                    selected && styles.optionTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>

        <View style={styles.rowWrap}>
          {dates.map((date) => {
            const selected = selectedDate === date;
            const hasAppointment = appointments.some((item) => item.date === date);

            return (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dateOption,
                  { backgroundColor: theme.box },
                  selected && { backgroundColor: theme.primary },
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: theme.text },
                    selected && styles.optionTextSelected,
                  ]}
                >
                  {date}
                </Text>

                {hasAppointment && <View style={styles.dot} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.label, { color: theme.text }]}>Horário</Text>

        <View style={styles.rowWrap}>
          {timeSlots.map((slot) => {
            const selected = time === slot;
            const unavailable = appointments.some(
              (item) => item.date === selectedDate && item.time === slot
            );

            return (
              <TouchableOpacity
                key={slot}
                disabled={unavailable}
                style={[
                  styles.timeOption,
                  { backgroundColor: theme.box },
                  selected && { backgroundColor: theme.primary },
                  unavailable && styles.unavailableOption,
                ]}
                onPress={() => setTime(slot)}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: theme.text },
                    selected && styles.optionTextSelected,
                    unavailable && styles.unavailableText,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.primary },
            (!selectedDate || !time) && styles.buttonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!selectedDate || !time}
        >
          <Ionicons name="calendar-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Confirmar Agendamento</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Compromissos
        </Text>

        <Text style={[styles.sectionCount, { color: theme.subtext }]}>
          {selectedDate ? `${appointmentsByDate.length} neste dia` : "Escolha uma data"}
        </Text>
      </View>

      {!selectedDate ? (
        <Text style={[styles.emptyText, { color: theme.subtext }]}>
          Selecione uma data para visualizar os compromissos.
        </Text>
      ) : appointmentsByDate.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.subtext }]}>
          Nenhum compromisso nesta data.
        </Text>
      ) : (
        appointmentsByDate.map((appointment) => (
          <View
            key={appointment.id}
            style={[styles.appointmentCard, { backgroundColor: theme.card }]}
          >
            <View style={styles.timeBox}>
              <Text style={[styles.timeText, { color: theme.text }]}>
                {appointment.time}
              </Text>
            </View>

            <View style={styles.appointmentInfo}>
              <View style={styles.badge}>
                <Ionicons name={appointment.icon} size={14} color={theme.primary} />
                <Text style={[styles.badgeText, { color: theme.primary }]}>
                  {appointment.label}
                </Text>
              </View>

              <Text style={[styles.description, { color: theme.subtext }]}>
                {appointment.description}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(appointment.id)}
            >
              <Ionicons name="trash-outline" size={20} color={theme.primary} />
            </TouchableOpacity>
          </View>
        ))
      )}

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

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },

  card: {
    padding: 20,
    borderRadius: 18,
    elevation: 4,
    marginBottom: 24,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
  },

  label: {
    marginTop: 14,
    marginBottom: 8,
    fontWeight: "700",
  },

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  serviceOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 4,
  },

  dateOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 4,
    alignItems: "center",
  },

  timeOption: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 4,
  },

  optionText: {
    fontSize: 13,
    fontWeight: "600",
  },

  optionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  unavailableOption: {
    opacity: 0.35,
  },

  unavailableText: {
    textDecorationLine: "line-through",
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#fff",
    marginTop: 5,
  },

  button: {
    marginTop: 22,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  buttonDisabled: {
    opacity: 0.45,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  sectionCount: {
    marginTop: 4,
    fontSize: 13,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
  },

  timeBox: {
    marginRight: 14,
  },

  timeText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  appointmentInfo: {
    flex: 1,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },

  badgeText: {
    fontSize: 13,
    fontWeight: "bold",
  },

  description: {
    fontSize: 13,
  },

  deleteButton: {
    padding: 8,
  },

  footer: {
    textAlign: "center",
    padding: 20,
    fontSize: 12,
  },
});