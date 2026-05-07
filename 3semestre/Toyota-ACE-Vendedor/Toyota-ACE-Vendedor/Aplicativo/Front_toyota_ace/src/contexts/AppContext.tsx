import { createContext, useContext, useState, ReactNode } from "react";

import {
  clients as initialClients,
  appointments as initialAppointments,
  type ClientStatus,
} from "@/lib/mock-data";

/* =========================
   TYPES
========================= */

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

  clients: Client[];

  appointments: Appointment[];

  selectedClientId: number | null;

  setSelectedClientId: (
    id: number | null
  ) => void;

  login: (
    email: string,
    password: string
  ) => boolean;

  logout: () => void;

  selectBranch: (
    name: string
  ) => void;

  addClient: (
    client: Omit<Client, "id">
  ) => void;

  updateClient: (
    id: number,
    data: Partial<Client>
  ) => void;

  deleteClient: (
    id: number
  ) => void;

  addAppointment: (
    appointment: Omit<
      Appointment,
      "id"
    >
  ) => void;

  deleteAppointment: (
    id: number
  ) => void;
};

/* =========================
   CONTEXT
========================= */

const AppContext =
  createContext<AppState | null>(
    null
  );

export function useAppContext() {
  const ctx =
    useContext(AppContext);

  if (!ctx) {
    throw new Error(
      "useAppContext must be inside AppProvider"
    );
  }

  return ctx;
}

/* =========================
   HELPERS
========================= */

const enrichAppointments = (
  appts: typeof initialAppointments
): Appointment[] =>
  appts.map((a) => ({
    ...a,
    date: "2026-03-21",
  }));

/* =========================
   PROVIDER
========================= */

export function AppProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [userName, setUserName] =
    useState("");

  const [
    selectedBranch,
    setSelectedBranch,
  ] = useState<string | null>(
    null
  );

  const [clients, setClients] =
    useState<Client[]>(
      initialClients
    );

  const [
    appointments,
    setAppointments,
  ] = useState<
    Appointment[]
  >(
    enrichAppointments(
      initialAppointments
    )
  );

  /* =========================
     CLIENTE SELECIONADO
  ========================= */

  const [
    selectedClientId,
    setSelectedClientId,
  ] = useState<number | null>(
    null
  );

  /* =========================
     LOGIN
  ========================= */

  const login = (
    email: string,
    password: string
  ) => {
    if (!email || !password)
      return false;

    const name = email
      .split("@")[0]
      .replace(
        /[^a-zA-Z]/g,
        " "
      )
      .replace(
        /\b\w/g,
        (c) =>
          c.toUpperCase()
      );

    setUserName(name);

    setIsLoggedIn(true);

    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);

    setUserName("");

    setSelectedBranch(null);
  };

  /* =========================
     BRANCH
  ========================= */

  const selectBranch = (
    name: string
  ) => {
    setSelectedBranch(name);
  };

  /* =========================
     CLIENTS
  ========================= */

  const addClient = (
    client: Omit<Client, "id">
  ) => {
    setClients((prev) => [
      ...prev,
      {
        ...client,
        id: Date.now(),
      },
    ]);
  };

  const updateClient = (
    id: number,
    data: Partial<Client>
  ) => {
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

  const deleteClient = (
    id: number
  ) => {
    setClients((prev) =>
      prev.filter(
        (c) => c.id !== id
      )
    );
  };

  /* =========================
     APPOINTMENTS
  ========================= */

  const addAppointment = (
    appointment: Omit<
      Appointment,
      "id"
    >
  ) => {
    setAppointments((prev) => [
      ...prev,
      {
        ...appointment,
        id: Date.now(),
      },
    ]);
  };

  const deleteAppointment = (
    id: number
  ) => {
    setAppointments((prev) =>
      prev.filter(
        (a) => a.id !== id
      )
    );
  };

  /* =========================
     PROVIDER
  ========================= */

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,

        userName,

        selectedBranch,

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