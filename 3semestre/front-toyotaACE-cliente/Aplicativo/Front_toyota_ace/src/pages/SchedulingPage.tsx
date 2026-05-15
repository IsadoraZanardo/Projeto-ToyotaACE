import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

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
  Plus,
  MapPin,
  Car,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

type AppointmentType = "revisao" | "retirada" | "recall" | "outros";

type Appointment = {
  id: number;
  date: string;
  time: string;
  client: string;
  type: AppointmentType;
  description: string;
};

const typeConfig = {
  revisao: {
    label: "Revisão",
    icon: Car,
    className: "bg-blue-500/15 text-blue-400",
  },
  retirada: {
    label: "Retirada",
    icon: CheckCircle2,
    className: "bg-green-500/15 text-green-400",
  },
  recall: {
    label: "Recall",
    icon: AlertTriangle,
    className: "bg-yellow-500/15 text-yellow-500",
  },
  outros: {
    label: "Outros",
    icon: MapPin,
    className: "bg-purple-500/15 text-purple-400",
  },
};

const mapTipoServico = (tipoServico?: string): AppointmentType => {
  const tipo = (tipoServico || "").toLowerCase();

  if (tipo.includes("revis")) return "revisao";
  if (tipo.includes("retirada")) return "retirada";
  if (tipo.includes("recall")) return "recall";

  return "outros";
};

const SchedulingPage = () => {
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  const [form, setForm] = useState({
    time: "",
    client: user?.name || user?.email || "",
    type: "retirada" as AppointmentType,
    description: "Agendamento de Retirada realizado pelo portal Toyota ACE",
  });

  const dateStr = format(selectedDate, "yyyy-MM-dd");

  const formattedDate = format(selectedDate, "d 'de' MMMM, yyyy", {
    locale: ptBR,
  });

  const carregarAgendamentos = async () => {
    try {
      if (!user?.id) return;

      setLoadingAppointments(true);

      const response = await api.buscarAgendamentosCliente(user.id);

      const dadosFormatados: Appointment[] = response.map((item: any) => ({
        id: item.id,
        date: item.data,
        time: item.horario?.substring(0, 5) || "",
        client: item.cliente?.nome || user.name || user.email || "",
        type: mapTipoServico(item.tipoServico),
        description: item.observacao || "",
      }));

      setAppointments(dadosFormatados);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
      toast.error("Não foi possível carregar os agendamentos.");
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    carregarAgendamentos();
  }, [user?.id]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      client: user?.name || user?.email || "",
    }));
  }, [user]);

  const dayAppointments = appointments
    .filter((appointment) => appointment.date === dateStr)
    .sort((a, b) => a.time.localeCompare(b.time));

  const datesWithAppointments = [
    ...new Set(appointments.map((appointment) => appointment.date)),
  ];

  const handleChangeType = (value: AppointmentType) => {
    setForm({
      ...form,
      type: value,
      description:
        value === "outros"
          ? ""
          : `Agendamento de ${typeConfig[value].label} realizado pelo portal Toyota ACE`,
    });
  };

  const handleSave = async () => {
    if (!form.time || !form.client.trim()) {
      toast.error("Preencha horário e cliente");
      return;
    }

    if (form.type === "outros" && !form.description.trim()) {
      toast.error("Informe a observação para o tipo Outros");
      return;
    }

    try {
      setLoading(true);

      await api.agendar({
        clienteId: user?.id,
        email: user?.email,
        data: dateStr,
        horario: `${form.time}:00`,
        tipoServico: typeConfig[form.type].label,
        observacao: form.description,
      });

      await carregarAgendamentos();

      toast.success("Agendamento criado!");
      setDialogOpen(false);

      setForm({
        time: "",
        client: user?.name || user?.email || "",
        type: "retirada",
        description: "Agendamento de Retirada realizado pelo portal Toyota ACE",
      });
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Não foi possível confirmar o agendamento."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deletarAgendamento(id);
      await carregarAgendamentos();

      setDeleteConfirm(null);
      toast.success("Agendamento removido!");
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      toast.error("Não foi possível remover o agendamento.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Agenda
            </h1>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>

          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Novo agendamento
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-lg border border-border bg-card p-2 self-start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              month={month}
              onMonthChange={setMonth}
              locale={ptBR}
              className="pointer-events-auto"
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              modifiers={{
                hasAppointment: datesWithAppointments.map(
                  (date) => new Date(`${date}T12:00:00`)
                ),
              }}
              modifiersClassNames={{
                hasAppointment: "border-2 border-red-500/50",
              }}
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Compromissos · {dayAppointments.length}
            </h2>

            {loadingAppointments ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Carregando agendamentos...
              </p>
            ) : dayAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nenhum compromisso neste dia.
              </p>
            ) : (
              <div className="space-y-2">
                {dayAppointments.map((appointment) => {
                  const config = typeConfig[appointment.type];
                  const Icon = config.icon;

                  return (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-lg border border-border bg-card hover:border-red-500/30 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-center shrink-0 pt-0.5">
                          <p className="text-lg font-bold tabular-nums">
                            {appointment.time}
                          </p>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">
                              {appointment.client}
                            </p>

                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1 ${config.className}`}
                            >
                              <Icon className="h-3 w-3" />
                              {config.label}
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground">
                            {appointment.description || "Sem observação"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(appointment.id)}
                          className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-destructive/15 transition-colors shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Toyota do Brasil — Todos os direitos
          reservados
        </div>
      </footer>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Novo agendamento</DialogTitle>
            <DialogDescription>
              Agende um compromisso para {formattedDate}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Horário</Label>
              <Input
                type="time"
                value={form.time}
                onChange={(event) =>
                  setForm({ ...form, time: event.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Cliente</Label>
              <Input
                value={form.client}
                onChange={(event) =>
                  setForm({ ...form, client: event.target.value })
                }
                placeholder="Nome do cliente"
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={form.type} onValueChange={handleChangeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="revisao">Revisão</SelectItem>
                  <SelectItem value="retirada">Retirada</SelectItem>
                  <SelectItem value="recall">Recall</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Observação</Label>
              <Input
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                placeholder="Detalhes do compromisso"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>

            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteConfirm !== null}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir agendamento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover este compromisso?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                if (deleteConfirm !== null) {
                  handleDelete(deleteConfirm);
                }
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulingPage;