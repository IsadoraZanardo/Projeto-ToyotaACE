import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Circle } from "lucide-react";

const vehicleData = {
  modelo: "Corolla Cross XRE",
  ano: "2025",
  motor: "2.0 Flex - 177cv",
  cor: "Branco Pérola",
};

// 🔥 STEPS COM DESCRIÇÃO
const steps = [
  {
    label: "Pedido Realizado",
    done: true,
    color: "bg-blue-500",
    description: "Seu pedido foi registrado no sistema da concessionária.",
  },
  {
    label: "Em Produção",
    done: true,
    color: "bg-yellow-500",
    description: "O veículo entrou na linha de produção da fábrica.",
  },
  {
    label: "Inspeção",
    done: false,
    color: "bg-orange-500",
    description: "São realizados testes de qualidade e segurança.",
  },
  {
    label: "Pronto para Retirada",
    done: false,
    color: "bg-green-500",
    description: "Seu veículo está pronto para ser retirado na concessionária.",
  },
];

const VehiclePage = () => {
  const currentStep = steps.filter((s) => s.done).length;
  const progress = Math.round((currentStep / steps.length) * 100);

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">

        {/* CONTEÚDO */}
        <main className="flex-1">
          <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">

            {/* HEADER */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Ficha Técnica do Veículo
              </h1>
              <p className="text-gray-500 mt-2">
                Acompanhe os detalhes e o processo de fabricação do seu carro.
              </p>
            </div>

            {/* CARD VEÍCULO */}
            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-black">
                  {vehicleData.modelo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="text-gray-500">Modelo</span>
                    <p className="font-medium">{vehicleData.modelo}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Ano</span>
                    <p className="font-medium">{vehicleData.ano}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Motor</span>
                    <p className="font-medium">{vehicleData.motor}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Cor</span>
                    <p className="font-medium">{vehicleData.cor}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TIMELINE */}
            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader>
                <CardTitle>Timeline de Fabricação</CardTitle>

                <p className="text-sm text-gray-500">
                  {currentStep} de {steps.length} etapas concluídas
                </p>

                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progresso</span>
                    <span className="font-medium text-green-600">
                      {progress}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-700 ease-in-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">

                  {steps.map((step, i) => (
                    <Tooltip key={step.label}>
                      <TooltipTrigger asChild>

                        <div className="flex items-start gap-4 cursor-pointer">

                          {/* ÍCONE */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step.done
                                  ? `${step.color} text-white`
                                  : "border-2 border-gray-300 text-gray-400"
                              }`}
                            >
                              {step.done ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Circle className="h-3 w-3" />
                              )}
                            </div>

                            {i < steps.length - 1 && (
                              <div
                                className={`w-0.5 h-10 ${
                                  step.done ? step.color : "bg-gray-200"
                                }`}
                              />
                            )}
                          </div>

                          {/* TEXTO */}
                          <div className="pt-1">
                            <p
                              className={`text-sm font-medium ${
                                step.done
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-500"
                              }`}
                            >
                              {step.label}
                            </p>

                            {step.done && (
                              <Badge className="mt-1 text-xs bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700">
                                Concluído
                              </Badge>
                            )}
                          </div>

                        </div>

                      </TooltipTrigger>

                      {/* POPUP */}
                      <TooltipContent>
                        <p className="text-sm max-w-xs">
                          {step.description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}

                </div>
              </CardContent>
            </Card>

          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-black border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Toyota do Brasil — Todos os direitos reservados
          </div>
        </footer>

      </div>
    </TooltipProvider>
  );
};

export default VehiclePage;