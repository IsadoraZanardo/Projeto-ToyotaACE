import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useAppContext,
  type Client,
} from "@/contexts/AppContext";

import { type ClientStatus } from "@/lib/mock-data";

import { api } from "@/services/api";

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
  name: "",
  email: "",
  password: "",
  cpf: "",
  phone: "",
  status: "lead" as ClientStatus,
  vehicle: "",
  lastContact: "Hoje",
};

const Clients = () => {
  const navigate = useNavigate();

  const {
    clients,
    addClient,
    updateClient,
    deleteClient,
    setSelectedClientId,
  } = useAppContext();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"az" | "za" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyClient);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const filtered = clients
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.vehicle.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "az") return a.name.localeCompare(b.name);
      if (sortOrder === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  const openNew = () => {
    setEditingId(null);
    setForm(emptyClient);
    setDialogOpen(true);
  };

  const openEdit = (client: Client) => {
    setEditingId(client.id);

    setForm({
      name: client.name,
      email: "",
      password: "",
      cpf: "",
      phone: client.phone,
      status: client.status,
      vehicle: client.vehicle,
      lastContact: client.lastContact,
    });

    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.vehicle.trim()) {
      toast.error("Preencha nome, telefone e veículo");
      return;
    }

    if (!editingId && (!form.email.trim() || !form.password.trim())) {
      toast.error("Para criar acesso, preencha email e senha");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        updateClient(editingId, {
          name: form.name,
          phone: form.phone,
          status: form.status,
          vehicle: form.vehicle,
          lastContact: form.lastContact,
        });

        toast.success("Cliente atualizado!");
      } else {
        await api.cadastrar({
          nome: form.name,
          email: form.email,
          senha: form.password,
          cpf: form.cpf,
          telefone: form.phone,
          endereco: "",
        });

        addClient({
          name: form.name,
          phone: form.phone,
          status: form.status,
          vehicle: form.vehicle,
          lastContact: form.lastContact,
        });

        toast.success("Cliente criado com acesso!");
      }

      setDialogOpen(false);
      setForm(emptyClient);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao salvar cliente no backend"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    deleteClient(id);
    setDeleteConfirm(null);
    toast.success("Cliente removido!");
  };

  const handleSelectVehicle = (clientId: number) => {
    setSelectedClientId(clientId);
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
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum cliente encontrado.
          </p>
        )}

        {filtered.map((c, i) => {
          const status = statusConfig[c.status];

          return (
            <div
              key={c.id}
              className={`p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-all animate-reveal-up delay-${Math.min(
                i + 2,
                5
              )}`}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-medium shrink-0">
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{c.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {c.vehicle} · {c.lastContact}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>

                  <button
                    onClick={() => handleSelectVehicle(c.id)}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/15 transition-colors"
                  >
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => openEdit(c)}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/15 transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => setDeleteConfirm(c.id)}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-destructive/15 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>

                  <a
                    href={`tel:${c.phone}`}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/15 transition-colors"
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
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Nome completo"
              />
            </div>

            {!editingId && (
              <>
                <div className="space-y-2">
                  <Label>Email de acesso</Label>

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
                  />
                </div>

                <div className="space-y-2">
                  <Label>Senha de acesso</Label>

                  <Input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    placeholder="Ex: 123456"
                  />
                </div>

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
              </>
            )}

            <div className="space-y-2">
              <Label>Telefone</Label>

              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label>Veículo</Label>

              <Input
                value={form.vehicle}
                onChange={(e) =>
                  setForm({
                    ...form,
                    vehicle: e.target.value,
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