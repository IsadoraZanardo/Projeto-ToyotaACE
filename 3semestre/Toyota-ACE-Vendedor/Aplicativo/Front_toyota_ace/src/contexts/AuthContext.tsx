import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  cpf: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  name: "Carlos Eduardo",
  email: "carlos@email.com",
  cpf: "123.456.789-00",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("toyota-auth");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, _password: string) => {
    const u = { ...MOCK_USER, email };
    setUser(u);
    localStorage.setItem("toyota-auth", JSON.stringify(u));
    return true;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    const u = { ...MOCK_USER, name, email };
    setUser(u);
    localStorage.setItem("toyota-auth", JSON.stringify(u));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("toyota-auth");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
