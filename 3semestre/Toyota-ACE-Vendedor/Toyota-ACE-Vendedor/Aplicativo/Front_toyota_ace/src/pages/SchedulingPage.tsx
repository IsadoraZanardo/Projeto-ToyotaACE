import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const SchedulingPage = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (date && time) setConfirmed(true);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* CONTEÚDO */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">

          {!confirmed ? (
            <div className="space-y-8 max-w-lg mx-auto">

              {/* HEADER */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Agendamento de Retirada
                </h1>
                <p className="text-gray-500 mt-2">
                  Escolha a melhor data para retirar seu veículo.
                </p>
              </div>

              {/* CARD */}
              <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Escolha a data e horário
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                  {/* DATA */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data</label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date
                            ? format(date, "dd/MM/yyyy", { locale: ptBR })
                            : "Selecione uma data"}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) => d < new Date()}
                          className="p-3 pointer-events-auto"
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* HORÁRIO */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Horário</label>

                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um horário" />
                      </SelectTrigger>

                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* BOTÃO */}
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={!date || !time}
                    onClick={handleConfirm}
                  >
                    Confirmar Agendamento
                  </Button>

                </CardContent>
              </Card>

            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">

              <Card className="max-w-md w-full text-center bg-white dark:bg-zinc-900 border shadow-lg">
                <CardContent className="pt-8 pb-8 space-y-4">

                  <CheckCircle2 className="h-16 w-16 text-red-600 mx-auto" />

                  <h2 className="text-xl font-bold">
                    Agendamento Confirmado!
                  </h2>

                  <p className="text-gray-500">
                    Retirada em{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {format(date!, "dd/MM/yyyy", { locale: ptBR })}
                    </span>{" "}
                    às{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {time}
                    </span>
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setConfirmed(false);
                      setDate(undefined);
                      setTime("");
                    }}
                  >
                    Reagendar
                  </Button>

                </CardContent>
              </Card>

            </div>
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Toyota do Brasil — Todos os direitos reservados
        </div>
      </footer>

    </div>
  );
};

export default SchedulingPage;