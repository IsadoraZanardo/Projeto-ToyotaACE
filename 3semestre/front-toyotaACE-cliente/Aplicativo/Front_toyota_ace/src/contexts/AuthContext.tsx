import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { api, Cliente } from "@/services/api";

interface AuthContextType {
  user: Cliente | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: Cliente | null) => void;
  login: (email: string, senha: string) => Promise<Cliente>;
  register: (dados: { nome: string; email: string; senha: string; cpf?: string; telefone?: string; endereco?: string }) => Promise<Cliente>;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = "toyota-auth";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUserState(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const setUser = useCallback((userData: Cliente | null) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    const cliente = await api.login({ email, senha });
    setUser(cliente);
    return cliente;
  }, [setUser]);

  const register = useCallback(async (dados: { nome: string; email: string; senha: string; cpf?: string; telefone?: string; endereco?: string }) => {
    const cliente = await api.cadastrar(dados);
    setUser(cliente);
    return cliente;
  }, [setUser]);

  const refreshUser = useCallback(async () => {
    if (!user?.email) return;
    const clienteAtualizado = await api.buscarClientePorEmail(user.email);
    setUser(clienteAtualizado);
  }, [setUser, user?.email]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, setUser, login, register, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
};
