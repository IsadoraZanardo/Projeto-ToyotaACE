import { createContext, useContext, useState, ReactNode } from "react";

import {
  clients as initialClients,
  appointments as initialAppointments,
  type ClientStatus,
} from "@/lib/mock-data";

import { api, UsuarioInterno } from "@/services/api";

export type ClientVehicleConfig = {
  vehicleId: number;
  vehicleName: string;
  version: string;
  color: string;
  seatMaterial: string;
  accessories: string[];
  totalPrice: number;
};

export type Client = {
  id: number;
  name: string;
  phone: string;
  status: ClientStatus;
  vehicle: string;
  lastContact: string;
  selectedVehicleConfig?: ClientVehicleConfig;
};

export type Appointment = {
  id: number;
  time: string;
  client: string;
  type: "visita" | "ligacao" | "test-drive";
  description: string;
  date: string;
};

type AppState = {
  isLoggedIn: boolean;
  userName: string;
  selectedBranch: string | null;
  user: UsuarioInterno | null;
  isAdmin: boolean;

  clients: Client[];
  appointments: Appointment[];

  selectedClientId: number | null;
  setSelectedClientId: (id: number | null) => void;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  selectBranch: (name: string) => void;

  addClient: (client: Omit<Client, "id">) => void;
  updateClient: (id: number, data: Partial<Client>) => void;
  deleteClient: (id: number) => void;

  addAppointment: (appointment: Omit<Appointment, "id">) => void;
  deleteAppointment: (id: number) => void;
};

const AppContext = createContext<AppState | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAppContext must be inside AppProvider");
  }

  return ctx;
}

const enrichAppointments = (
  appts: typeof initialAppointments
): Appointment[] =>
  appts.map((a) => ({
    ...a,
    date: "2026-03-21",
  }));

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsuarioInterno | null>(() => {
    const saved = localStorage.getItem("toyota-vendedor-user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("toyota-vendedor-user");
  });

  const [userName, setUserName] = useState(() => {
    const saved = localStorage.getItem("toyota-vendedor-user");

    if (!saved) return "";

    try {
      const parsed: UsuarioInterno = JSON.parse(saved);
      return parsed.nome || "";
    } catch {
      return "";
    }
  });

  const [selectedBranch, setSelectedBranch] = useState<string | null>(() => {
    return localStorage.getItem("toyota-vendedor-branch");
  });

  const [clients, setClients] = useState<Client[]>(initialClients);

  const [appointments, setAppointments] = useState<Appointment[]>(
    enrichAppointments(initialAppointments)
  );

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const isAdmin = user?.perfil === "ADMIN";

  const login = async (email: string, password: string) => {
    try {
      const usuario = await api.loginUsuario(
        email.trim().toLowerCase(),
        password
      );

      if (!usuario.ativo) {
        return false;
      }

      setUser(usuario);
      setUserName(usuario.nome);
      setIsLoggedIn(true);

      localStorage.setItem("toyota-vendedor-user", JSON.stringify(usuario));

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserName("");
    setSelectedBranch(null);

    localStorage.removeItem("toyota-vendedor-user");
    localStorage.removeItem("toyota-vendedor-branch");
  };

  const selectBranch = (name: string) => {
    setSelectedBranch(name);
    localStorage.setItem("toyota-vendedor-branch", name);
  };

  const addClient = (client: Omit<Client, "id">) => {
    setClients((prev) => [
      ...prev,
      {
        ...client,
        id: Date.now(),
      },
    ]);
  };

  const updateClient = (id: number, data: Partial<Client>) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...data,
            }
          : c
      )
    );
  };

  const deleteClient = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    setAppointments((prev) => [
      ...prev,
      {
        ...appointment,
        id: Date.now(),
      },
    ]);
  };

  const deleteAppointment = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        userName,
        selectedBranch,
        user,
        isAdmin,

        clients,
        appointments,

        selectedClientId,
        setSelectedClientId,

        login,
        logout,

        selectBranch,

        addClient,
        updateClient,
        deleteClient,

        addAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}