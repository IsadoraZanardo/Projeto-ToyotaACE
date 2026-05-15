import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api, type Cliente } from "@/services/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Search,
  Plus,
  Phone,
  Trash2,
  Edit2,
  ArrowUpAZ,
  ArrowDownAZ,
  Car,
} from "lucide-react";

import { toast } from "sonner";

type ClientStatus = "lead" | "negociacao" | "fechado";

const statusConfig: Record<
  ClientStatus,
  {
    label: string;
    className: string;
  }
> = {
  lead: {
    label: "Lead",
    className: "bg-blue-500/15 text-blue-400",
  },
  negociacao: {
    label: "Negociação",
    className: "bg-warning/15 text-yellow-400",
  },
  fechado: {
    label: "Fechado",
    className: "bg-success/15 text-green-400",
  },
};

const emptyClient = {
  nome: "",
  email: "",
  senha: "",
  cpf: "",
  telefone: "",
  status: "lead" as ClientStatus,
  modeloVeiculo: "",
};

const Clients = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState<Cliente[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"az" | "za" | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyClient);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);

  const carregarClientes = async () => {
    try {
      setLoadingClients(true);
      const data = await api.listarClientes();
      setClients(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      toast.error("Erro ao carregar clientes do backend.");
    } finally {
      setLoadingClients(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const filtered = clients
    .filter((c) => {
      const termo = search.toLowerCase();

      return (
        (c.nome || "").toLowerCase().includes(termo) ||
        (c.email || "").toLowerCase().includes(termo) ||
        (c.telefone || "").toLowerCase().includes(termo) ||
        (c.modeloVeiculo || "").toLowerCase().includes(termo)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "az") {
        return (a.nome || "").localeCompare(b.nome || "");
      }

      if (sortOrder === "za") {
        return (b.nome || "").localeCompare(a.nome || "");
      }

      return 0;
    });

  const openNew = () => {
    setEditingId(null);
    setForm(emptyClient);
    setDialogOpen(true);
  };

  const openEdit = (client: Cliente) => {
    if (!client.id) return;

    setEditingId(client.id);

    setForm({
      nome: client.nome || "",
      email: client.email || "",
      senha: "",
      cpf: client.cpf || "",
      telefone: client.telefone || "",
      status: "lead",
      modeloVeiculo: client.modeloVeiculo || "",
    });

    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.nome.trim() || !form.telefone.trim()) {
      toast.error("Preencha nome e telefone.");
      return;
    }

    if (!editingId && (!form.email.trim() || !form.senha.trim())) {
      toast.error("Para criar acesso, preencha email e senha.");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await api.atualizarCliente(editingId, {
          nome: form.nome,
          email: form.email,
          cpf: form.cpf,
          telefone: form.telefone,
          modeloVeiculo: form.modeloVeiculo,
        });

        toast.success("Cliente atualizado!");
      } else {
        await api.cadastrar({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          cpf: form.cpf,
          telefone: form.telefone,
          endereco: "",
        });

        toast.success("Cliente criado com acesso!");
      }

      setDialogOpen(false);
      setForm(emptyClient);
      await carregarClientes();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao salvar cliente no backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deletarCliente(id);
      setDeleteConfirm(null);
      toast.success("Cliente removido!");
      await carregarClientes();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast.error("Erro ao excluir cliente.");
    }
  };

  const handleSelectVehicle = (clientId?: number) => {
    if (!clientId) {
      toast.error("Cliente inválido.");
      return;
    }

    localStorage.setItem("toyota_selected_client_id", String(clientId));
    navigate("/veiculos");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="animate-reveal-up">
          <h1 className="text-xl font-semibold">Clientes</h1>

          <p className="text-sm text-muted-foreground">
            {clients.length} clientes cadastrados
          </p>
        </div>

        <Button
          onClick={openNew}
          className="bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] transition-all animate-reveal-up delay-1"
        >
          <Plus className="h-4 w-4 mr-1" />
          Novo cliente
        </Button>
      </div>

      {/* BUSCA */}
      <div className="flex gap-2 animate-reveal-up delay-1">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setSortOrder((prev) =>
              prev === "az" ? "za" : prev === "za" ? null : "az"
            )
          }
          className={sortOrder ? "border-primary/50 text-primary" : ""}
        >
          {sortOrder === "za" ? (
            <ArrowDownAZ className="h-4 w-4" />
          ) : (
            <ArrowUpAZ className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* LISTA */}
      <div className="space-y-2">
        {loadingClients && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Carregando clientes...
          </p>
        )}

        {!loadingClients && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum cliente encontrado.
          </p>
        )}

        {!loadingClients &&
          filtered.map((c, i) => {
            const status = statusConfig[form.status] || statusConfig.lead;

            return (
              <div
                key={c.id}
                className={`p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-all animate-reveal-up delay-${Math.min(
                  i + 2,
                  5
                )}`}
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  {/* ESQUERDA */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-medium shrink-0">
                      {(c.nome || "?")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{c.nome}</p>

                      <p className="text-xs text-muted-foreground">
                        {c.modeloVeiculo || "Sem veículo"} ·{" "}
                        {c.telefone || c.email || "Sem contato"}
                      </p>
                    </div>
                  </div>

                  {/* DIREITA */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>

                    <button
                      onClick={() => handleSelectVehicle(c.id)}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/15 transition-colors"
                      title="Configurar veículo"
                    >
                      <Car className="h-4 w-4 text-muted-foreground" />
                    </button>

                    <button
                      onClick={() => openEdit(c)}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/15 transition-colors"
                      title="Editar cliente"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>

                    <button
                      onClick={() => c.id && setDeleteConfirm(c.id)}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-destructive/15 transition-colors"
                      title="Excluir cliente"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>

                    <a
                      href={`tel:${c.telefone || ""}`}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/15 transition-colors"
                      title="Ligar"
                    >
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* MODAL CLIENTE */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar cliente" : "Novo cliente"}</DialogTitle>

            <DialogDescription>
              {editingId
                ? "Atualize as informações do cliente."
                : "Preencha os dados do novo cliente e crie o acesso dele."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nome</Label>

              <Input
                value={form.nome}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nome: e.target.value,
                  })
                }
                placeholder="Nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                placeholder="cliente@email.com"
                disabled={!!editingId}
              />
            </div>

            {!editingId && (
              <div className="space-y-2">
                <Label>Senha de acesso</Label>

                <Input
                  type="password"
                  value={form.senha}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      senha: e.target.value,
                    })
                  }
                  placeholder="Ex: 123456"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>CPF</Label>

              <Input
                value={form.cpf}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cpf: e.target.value,
                  })
                }
                placeholder="000.000.000-00"
              />
            </div>

            <div className="space-y-2">
              <Label>Telefone</Label>

              <Input
                value={form.telefone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    telefone: e.target.value,
                  })
                }
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label>Veículo</Label>

              <Input
                value={form.modeloVeiculo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    modeloVeiculo: e.target.value,
                  })
                }
                placeholder="Ex: Corolla Cross"
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    status: v as ClientStatus,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="negociacao">Negociação</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>

            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL EXCLUIR */}
      <Dialog
        open={deleteConfirm !== null}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir cliente</DialogTitle>

            <DialogDescription>
              Tem certeza que deseja remover este cliente?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>

            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;