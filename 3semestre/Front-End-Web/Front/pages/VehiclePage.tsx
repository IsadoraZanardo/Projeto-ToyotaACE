import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Circle } from "lucide-react";

const vehicleData = {
  modelo: "Corolla Cross XRE",
  ano: "2025",
  motor: "2.0 Flex - 177cv",
  cor: "Branco Pérola",
};

const steps = [
  { label: "Pedido Realizado", done: true },
  { label: "Em Produção", done: true },
  { label: "Montagem", done: true },
  { label: "Pintura", done: false },
  { label: "Inspeção", done: false },
  { label: "Pronto para Retirada", done: false },
];

const VehiclePage = () => {
  const currentStep = steps.filter((s) => s.done).length;

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Ficha Técnica do Veículo</h1>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>{vehicleData.modelo}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Modelo</span>
              <p className="font-medium">{vehicleData.modelo}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Ano</span>
              <p className="font-medium">{vehicleData.ano}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Motor</span>
              <p className="font-medium">{vehicleData.motor}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Cor</span>
              <p className="font-medium">{vehicleData.cor}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle className="text-lg">Timeline de Fabricação</CardTitle>
          <p className="text-sm text-muted-foreground">{currentStep} de {steps.length} etapas concluídas</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    step.done ? "bg-primary text-primary-foreground" : "border-2 border-muted-foreground/30 text-muted-foreground"
                  }`}>
                    {step.done ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-0.5 h-8 ${step.done ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
                <div className="pt-1">
                  <p className={`text-sm font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                  {step.done && <Badge variant="secondary" className="mt-1 text-xs">Concluído</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehiclePage;
