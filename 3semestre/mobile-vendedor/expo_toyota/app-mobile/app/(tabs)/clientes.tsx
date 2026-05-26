// screens/Clientes.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type Client = {
  id: number;
  name: string;
  phone: string;
  email?: string;
  vehicle?: string;
  notes?: string;
  createdAt: string;
};

export default function Clientes() {
  const { colors } = useTheme();

  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "João Silva", phone: "(11) 98765-4321", email: "joao@email.com", vehicle: "Honda Civic 2023", notes: "Interessado em test-drive", createdAt: "2026-04-20" },
    { id: 2, name: "Maria Oliveira", phone: "(21) 99876-5432", vehicle: "Toyota Corolla", createdAt: "2026-04-25" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState({
    name: "", phone: "", email: "", vehicle: "", notes: ""
  });

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  const openModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setForm({
        name: client.name,
        phone: client.phone,
        email: client.email || "",
        vehicle: client.vehicle || "",
        notes: client.notes || "",
      });
    } else {
      setEditingClient(null);
      setForm({ name: "", phone: "", email: "", vehicle: "", notes: "" });
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      Alert.alert("Erro", "Nome e telefone são obrigatórios.");
      return;
    }

    if (editingClient) {
      // Editar
      setClients(prev => prev.map(c =>
        c.id === editingClient.id
          ? { ...c, ...form, name: form.name.trim(), phone: form.phone.trim() }
          : c
      ));
    } else {
      // Novo
      const newClient: Client = {
        id: Date.now(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        vehicle: form.vehicle.trim() || undefined,
        notes: form.notes.trim() || undefined,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setClients(prev => [newClient, ...prev]);
    }

    setModalVisible(false);
    setEditingClient(null);
    setForm({ name: "", phone: "", email: "", vehicle: "", notes: "" });
  };

  const handleDelete = (id: number) => {
    Alert.alert("Excluir Cliente", "Deseja realmente excluir este cliente?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => setClients(prev => prev.filter(c => c.id !== id))
      }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Clientes</Text>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: "#DC2626" }]} onPress={() => openModal()}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: colors.card }]}>
          <Ionicons name="search" size={20} color={colors.text + "70"} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar cliente..."
            placeholderTextColor={colors.text + "70"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredClients}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.clientCard, { backgroundColor: colors.card }]}
            onPress={() => openModal(item)}
          >
            <View style={styles.clientInfo}>
              <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.phone, { color: colors.text + "90" }]}>{item.phone}</Text>
              {item.vehicle && <Text style={{ color: colors.text + "80" }}>🚗 {item.vehicle}</Text>}
            </View>
            <TouchableOpacity onPress={(e) => { e.stopPropagation(); handleDelete(item.id); }}>
              <Ionicons name="trash-outline" size={24} color="#EF4444" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: colors.text, fontSize: 17 }}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {editingClient ? "Editar Cliente" : "Novo Cliente"}
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={{ color: "#DC2626", fontSize: 17, fontWeight: "bold" }}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.text + "30" }]} placeholder="Nome *" placeholderTextColor={colors.text+"70"} value={form.name} onChangeText={t => setForm({...form, name: t})} />
            <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.text + "30" }]} placeholder="Telefone *" placeholderTextColor={colors.text+"70"} value={form.phone} onChangeText={t => setForm({...form, phone: t})} keyboardType="phone-pad" />
            <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.text + "30" }]} placeholder="Email" placeholderTextColor={colors.text+"70"} value={form.email} onChangeText={t => setForm({...form, email: t})} keyboardType="email-address" />
            <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.text + "30" }]} placeholder="Veículo de interesse" placeholderTextColor={colors.text+"70"} value={form.vehicle} onChangeText={t => setForm({...form, vehicle: t})} />
            <TextInput style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.text + "30" }]} placeholder="Observações" placeholderTextColor={colors.text+"70"} value={form.notes} onChangeText={t => setForm({...form, notes: t})} multiline />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  addButton: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  searchContainer: { paddingHorizontal: 16, paddingBottom: 12 },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderRadius: 12, height: 50 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  list: { padding: 16 },
  clientCard: { flexDirection: 'row', padding: 16, borderRadius: 14, marginBottom: 12, alignItems: 'center' },
  clientInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: '600' },
  phone: { fontSize: 15, marginTop: 4 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#333' },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  modalContent: { padding: 20 },
  input: { borderWidth: 1, borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
});