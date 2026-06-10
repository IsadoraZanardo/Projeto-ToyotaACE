import { useEffect, useMemo, useState } from "react";
import {
  Edit,
  Plus,
  Search,
  ShieldCheck,
  User,
  UserCog,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

import { api, PerfilUsuario, UsuarioInterno } from "@/services/api";
import { useAppContext } from "@/contexts/AppContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

type FormState = {
  nome: string;
  email: string;
  senha: string;
  perfil: PerfilUsuario;
  ativo: boolean;
};

const emptyForm: FormState = {
  nome: "",
  email: "",
  senha: "",
  perfil: "VENDEDOR",
  ativo: true,
};

function formatDate(date?: string) {
  if (!date) return "Sem data";

  if (date.includes("-")) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  return date;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const Usuarios = () => {
  const { isAdmin, user } = useAppContext();

  const [usuarios, setUsuarios] = useState<UsuarioInterno[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UsuarioInterno | null>(null);

  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const filteredUsuarios = useMemo(() => {
    const query = search.toLowerCase();

    return usuarios.filter((usuario) => {
      return (
        usuario.nome.toLowerCase().includes(query) ||
        usuario.email.toLowerCase().includes(query) ||
        usuario.perfil.toLowerCase().includes(query)
      );
    });
  }, [usuarios, search]);

  async function loadUsuarios() {
    try {
      setLoading(true);
      const response = await api.listarUsuarios();
      setUsuarios(response);
    } catch (error: any) {
      toast.error(error?.message || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingUser(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(usuario: UsuarioInterno) {
    setEditingUser(usuario);

    setForm({
      nome: usuario.nome,
      email: usuario.email,
      senha: "",
      perfil: usuario.perfil,
      ativo: usuario.ativo,
    });

    setModalOpen(true);
  }

  async function saveUsuario(e: React.FormEvent) {
    e.preventDefault();

    const nome = form.nome.trim();
    const email = form.email.trim().toLowerCase();
    const senha = form.senha.trim();

    if (!nome || !email) {
      toast.error("Nome e e-mail são obrigatórios");
      return;
    }

    if (!editingUser && !senha) {
      toast.error("Senha é obrigatória para novo usuário");
      return;
    }

    try {
      setSaving(true);

      const payload: UsuarioInterno = {
        nome,
        email,
        perfil: form.perfil,
        ativo: form.ativo,
        ...(senha ? { senha } : {}),
      };

      if (editingUser?.id) {
        await api.atualizarUsuario(editingUser.id, payload);
        toast.success("Usuário atualizado com sucesso");
      } else {
        await api.criarUsuario(payload);
        toast.success("Usuário criado com sucesso");
      }

      setModalOpen(false);
      setEditingUser(null);
      setForm(emptyForm);

      await loadUsuarios();
    } catch (error: any) {
      toast.error(error?.message || "Erro ao salvar usuário");
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(usuario: UsuarioInterno) {
    if (user?.id === usuario.id && usuario.ativo) {
      toast.error("Você não pode desativar o próprio usuário logado");
      return;
    }

    try {
      await api.atualizarUsuario(usuario.id!, {
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        ativo: !usuario.ativo,
      });

      toast.success(
        !usuario.ativo
          ? "Usuário ativado com sucesso"
          : "Usuário desativado com sucesso"
      );

      await loadUsuarios();
    } catch (error: any) {
      toast.error(error?.message || "Erro ao alterar status");
    }
  }

  async function disableUsuario(usuario: UsuarioInterno) {
    if (user?.id === usuario.id) {
      toast.error("Você não pode desativar o próprio usuário logado");
      return;
    }

    const confirmar = window.confirm(
      `Deseja realmente desativar ${usuario.nome}?`
    );

    if (!confirmar) return;

    try {
      await api.desativarUsuario(usuario.id!);
      toast.success("Usuário desativado com sucesso");
      await loadUsuarios();
    } catch (error: any) {
      toast.error(error?.message || "Erro ao desativar usuário");
    }
  }

  if (!isAdmin) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />

            <h1 className="text-xl font-bold">Acesso restrito</h1>

            <p className="text-sm text-muted-foreground mt-2">
              Apenas administradores podem gerenciar usuários internos.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-reveal-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>

          <p className="text-sm text-muted-foreground">
            Controle administradores e vendedores do ACE Vendedor.
          </p>
        </div>

        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          Novo usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Usuários internos</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar usuário..."
              className="pl-9"
            />
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Carregando usuários...
            </div>
          ) : filteredUsuarios.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Nenhum usuário encontrado.
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredUsuarios.map((usuario) => {
                const isCurrentUser = user?.id === usuario.id;

                return (
                  <div
                    key={usuario.id}
                    className={`rounded-xl border border-border bg-card p-4 flex flex-col lg:flex-row lg:items-center gap-4 ${
                      usuario.ativo ? "" : "opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center font-bold text-sm">
                        {initials(usuario.nome)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold truncate">
                            {usuario.nome}
                          </h2>

                          {isCurrentUser && (
                            <Badge variant="secondary">Você</Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground truncate">
                          {usuario.email}
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                          Criado em {formatDate(usuario.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        className={
                          usuario.perfil === "ADMIN"
                            ? "bg-primary/15 text-primary hover:bg-primary/15"
                            : "bg-blue-500/15 text-blue-400 hover:bg-blue-500/15"
                        }
                      >
                        {usuario.perfil === "ADMIN" ? (
                          <ShieldCheck className="h-3 w-3 mr-1" />
                        ) : (
                          <User className="h-3 w-3 mr-1" />
                        )}
                        {usuario.perfil}
                      </Badge>

                      <Badge
                        className={
                          usuario.ativo
                            ? "bg-green-500/15 text-green-400 hover:bg-green-500/15"
                            : "bg-red-500/15 text-red-400 hover:bg-red-500/15"
                        }
                      >
                        {usuario.ativo ? "ATIVO" : "INATIVO"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 lg:justify-end">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => openEditModal(usuario)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => toggleStatus(usuario)}
                        title={usuario.ativo ? "Desativar" : "Ativar"}
                      >
                        {usuario.ativo ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => disableUsuario(usuario)}
                        disabled={!usuario.ativo}
                        className="text-red-500"
                      >
                        Desativar
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl">
            <div className="p-5 border-b border-border flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">
                  {editingUser ? "Editar usuário" : "Novo usuário"}
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Defina os dados de acesso e o perfil do usuário.
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setModalOpen(false)}
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={saveUsuario} className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome</label>

                <Input
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail</label>

                <Input
                  value={form.email}
                  type="email"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value.trim().toLowerCase(),
                    })
                  }
                  placeholder="usuario@toyota.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {editingUser
                    ? "Nova senha — deixe vazio para manter"
                    : "Senha"}
                </label>

                <Input
                  value={form.senha}
                  type="password"
                  onChange={(e) => setForm({ ...form, senha: e.target.value })}
                  placeholder={
                    editingUser
                      ? "Deixe vazio para não alterar"
                      : "Senha de acesso"
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, perfil: "ADMIN" })}
                  className={`rounded-xl border p-4 flex flex-col items-center gap-2 transition ${
                    form.perfil === "ADMIN"
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-secondary/30"
                  }`}
                >
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-sm font-bold">ADMIN</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, perfil: "VENDEDOR" })}
                  className={`rounded-xl border p-4 flex flex-col items-center gap-2 transition ${
                    form.perfil === "VENDEDOR"
                      ? "border-blue-400 bg-blue-500/15 text-blue-400"
                      : "border-border bg-secondary/30"
                  }`}
                >
                  <UserCog className="h-5 w-5" />
                  <span className="text-sm font-bold">VENDEDOR</span>
                </button>
              </div>

              <div className="rounded-xl border border-border bg-secondary/30 p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Usuário ativo</p>

                  <p className="text-sm text-muted-foreground">
                    Usuários inativos não conseguem acessar o sistema.
                  </p>
                </div>

                <Switch
                  checked={form.ativo}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, ativo: checked })
                  }
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </Button>

                <Button type="submit" disabled={saving}>
                  {saving
                    ? "Salvando..."
                    : editingUser
                    ? "Salvar alterações"
                    : "Criar usuário"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;