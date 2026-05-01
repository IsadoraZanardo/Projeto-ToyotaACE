import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

// Interface atualizada para refletir os dados que vimos no seu JSON (image_bafc72.png)
interface User {
  id?: number;
  nome: string;
  email: string;
  cpf?: string;
  statusVeiculo?: string;
  modeloCarro?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void; // Permite atualizar o usuário globalmente
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Tenta recuperar o usuário do navegador ao carregar a página
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("toyota-auth");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // Função para salvar o usuário quando ele logar ou os dados chegarem da API
  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem("toyota-auth", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("toyota-auth");
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      isAuthenticated: !!user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};