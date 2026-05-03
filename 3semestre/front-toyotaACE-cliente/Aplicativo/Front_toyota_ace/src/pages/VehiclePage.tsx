import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api, Cliente } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Circle } from "lucide-react";

const baseSteps = [
  { label: "Pedido Realizado", min: 1, color: "bg-blue-500", description: "Seu pedido foi registrado no sistema da concessionária." },
  { label: "Linha de Produção", min: 25, color: "bg-yellow-500", description: "O veículo entrou na linha de produção da fábrica." },
  { label: "Inspeção", min: 45, color: "bg-orange-500", description: "São realizados testes de qualidade e segurança." },
  { label: "Cegonha", min: 60, color: "bg-red-500", description: "Seu veículo está em transporte, a caminho da concessionária." },
  { label: "Concessionária", min: 80, color: "bg-pink-500", description: "Seu veículo chegou na concessionária." },
  { label: "Pronto para Retirada", min: 95, color: "bg-green-500", description: "Seu veículo está pronto para ser retirado." },
];

const VehiclePage = () => {
  const { user } = useAuth();
  const [vehicleData, setVehicleData] = useState<Cliente | null>(user);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarVeiculo() {
      if (!user?.email) return;
      try {
        const resposta = await api.buscarVeiculoPorEmail(user.email);
        setVehicleData(resposta);
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro ao carregar veículo.");
      }
    }
    carregarVeiculo();
  }, [user?.email]);

  const progress = vehicleData?.progressoVeiculo ?? 45;
  const steps = useMemo(() => baseSteps.map((step) => ({ ...step, done: progress >= step.min })), [progress]);
  const currentStep = steps.filter((s) => s.done).length;

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ficha Técnica do Veículo</h1>
              <p className="text-gray-500 mt-2">Acompanhe os detalhes e o processo de fabricação do seu carro.</p>
              {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}
            </div>

            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader><CardTitle className="text-xl">{vehicleData?.modeloVeiculo || "Veículo Toyota"}</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
                  <Campo label="Modelo" value={vehicleData?.modeloVeiculo} />
                  <Campo label="Ano" value={vehicleData?.anoVeiculo} />
                  <Campo label="Motor" value={vehicleData?.motorVeiculo} />
                  <Campo label="Cor" value={vehicleData?.corVeiculo} />
                  <Campo label="Câmbio" value={vehicleData?.cambioVeiculo} />
                  <Campo label="Combustível" value={vehicleData?.combustivelVeiculo} />
                  <Campo label="Placa" value={vehicleData?.placaVeiculo} />
                  <Campo label="Chassi" value={vehicleData?.chassiVeiculo} />
                  <Campo label="Status" value={vehicleData?.statusVeiculo} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader>
                <CardTitle>Timeline de Fabricação</CardTitle>
                <p className="text-sm text-gray-500">{currentStep} de {steps.length} etapas concluídas</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progresso</span>
                    <span className="font-medium text-green-600">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-700 ease-in-out" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <Tooltip key={step.label}>
                      <TooltipTrigger asChild>
                        <div className="flex items-start gap-4 cursor-pointer">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.done ? `${step.color} text-white` : "border-2 border-gray-300 text-gray-400"}`}>
                              {step.done ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                            </div>
                            {i < steps.length - 1 && <div className={`w-0.5 h-10 ${step.done ? step.color : "bg-gray-200"}`} />}
                          </div>
                          <div className="pt-1">
                            <p className={`text-sm font-medium ${step.done ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>{step.label}</p>
                            {step.done && <Badge className="mt-1 text-xs bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700">Concluído</Badge>}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent><p className="text-sm max-w-xs">{step.description}</p></TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="bg-black border-t border-border"><div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">© {new Date().getFullYear()} Toyota do Brasil — Todos os direitos reservados</div></footer>
      </div>
    </TooltipProvider>
  );
};

function Campo({ label, value }: { label: string; value?: string }) {
  return <div><span className="text-gray-500">{label}</span><p className="font-medium">{value || "Não informado"}</p></div>;
}

export default VehiclePage;
