import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { api, endpoints } from "@/services/api";

export type PerfilUsuario = "ADMIN" | "VENDEDOR";

export type UsuarioInterno = {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  perfil: PerfilUsuario;
  ativo: boolean;
  createdAt: string;
};

type AuthContextType = {
  user: UsuarioInterno | null;
  loading: boolean;
  usuarios: UsuarioInterno[];
  isAdmin: boolean;
  login: (email: string, senha: string) => Promise<UsuarioInterno>;
  logout: () => Promise<void>;
  salvarUsuarios: (lista: UsuarioInterno[]) => Promise<void>;
  recarregarUsuarios: () => Promise<void>;
};

export const SESSION_STORAGE_KEY = "@toyota_ace_vendedor:sessao";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsuarioInterno | null>(null);
  const [usuarios, setUsuarios] = useState<UsuarioInterno[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.perfil === "ADMIN";

  useEffect(() => {
    iniciarAuth();
  }, []);

  async function iniciarAuth() {
    try {
      const sessaoSalva = await AsyncStorage.getItem(SESSION_STORAGE_KEY);

      if (sessaoSalva) {
        const usuarioSessao: UsuarioInterno = JSON.parse(sessaoSalva);

        if (usuarioSessao?.ativo) {
          setUser(usuarioSessao);
        } else {
          await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
          setUser(null);
        }
      }

      await recarregarUsuarios();
    } catch (error) {
      console.log("Erro ao iniciar autenticação:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function recarregarUsuarios() {
    try {
      const lista = await api.get<UsuarioInterno[]>(endpoints.usuarios);
      setUsuarios(lista);
    } catch (error) {
      console.log("Erro ao carregar usuários:", error);
      setUsuarios([]);
    }
  }

  async function salvarUsuarios(lista: UsuarioInterno[]) {
    setUsuarios(lista);

    if (user) {
      const usuarioAtualizado = lista.find((item) => item.id === user.id);

      if (!usuarioAtualizado || !usuarioAtualizado.ativo) {
        await logout();
        return;
      }

      setUser(usuarioAtualizado);

      await AsyncStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify(usuarioAtualizado)
      );
    }
  }

  async function login(email: string, senha: string) {
    const usuario = await api.post<UsuarioInterno>(endpoints.loginUsuario, {
      email: email.trim().toLowerCase(),
      senha,
    });

    setUser(usuario);

    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(usuario));

    await recarregarUsuarios();

    return usuario;
  }

  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      usuarios,
      isAdmin,
      login,
      logout,
      salvarUsuarios,
      recarregarUsuarios,
    }),
    [user, loading, usuarios, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth precisa ser usado dentro de AuthProvider.");
  }

  return context;
}

export default AuthProvider;