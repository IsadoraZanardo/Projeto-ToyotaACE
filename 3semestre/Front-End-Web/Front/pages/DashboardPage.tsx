import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Factory, ClipboardCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Olá, Fulano! 👋</h1>
        <p className="text-muted-foreground mt-1">Acompanhe o status do seu veículo em tempo real.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="p-2 rounded-lg bg-accent">
              <Car className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">Status do Veículo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Em Produção</p>
            <p className="text-sm text-muted-foreground mt-1">Corolla Cross XRE 2025</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="p-2 rounded-lg bg-accent">
              <Factory className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">Etapa Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Montagem</p>
            <div className="mt-2">
              <Progress value={50} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">50% concluído</p>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="p-2 rounded-lg bg-accent">
              <ClipboardCheck className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">Próximas Ações</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li className="text-muted-foreground">• Pintura programada</li>
              <li className="text-muted-foreground">• Inspeção de qualidade</li>
              <li className="text-muted-foreground">• Liberação para retirada</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
