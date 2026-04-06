import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Percent, Calendar, CreditCard } from "lucide-react";

const financing = {
  valorTotal: 189990,
  entrada: 50000,
  parcelas: 48,
  taxa: 1.29,
  valorParcela: 3845.62,
};

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const FinancingPage = () => (
  <div className="space-y-6 max-w-3xl">
    <h1 className="text-2xl font-bold">Simulação de Financiamento</h1>

    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Valor Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{fmt(financing.valorTotal)}</p>
          <p className="text-sm text-muted-foreground">Corolla Cross XRE 2025</p>
        </CardContent>
      </Card>

      <Card className="animate-fade-in" style={{ animationDelay: "0.05s" }}>
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Entrada</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{fmt(financing.entrada)}</p>
          <p className="text-sm text-muted-foreground">{((financing.entrada / financing.valorTotal) * 100).toFixed(0)}% do valor</p>
        </CardContent>
      </Card>

      <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Parcelas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{financing.parcelas}x de {fmt(financing.valorParcela)}</p>
          <p className="text-sm text-muted-foreground">Valor financiado: {fmt(financing.valorTotal - financing.entrada)}</p>
        </CardContent>
      </Card>

      <Card className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <Percent className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Taxa de Juros</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{financing.taxa}% a.m.</p>
          <p className="text-sm text-muted-foreground">{(financing.taxa * 12).toFixed(2)}% ao ano</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default FinancingPage;
