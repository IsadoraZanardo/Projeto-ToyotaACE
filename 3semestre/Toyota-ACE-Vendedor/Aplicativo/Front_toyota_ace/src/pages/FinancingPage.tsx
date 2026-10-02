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

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const FinancingPage = () => (
  <div className="min-h-screen flex flex-col">

    {/* CONTEÚDO */}
    <main className="flex-1">
      <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Simulação de Financiamento
          </h1>
          <p className="text-gray-500 mt-2">
            Veja os detalhes do financiamento do seu veículo.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">

          {/* VALOR TOTAL */}
          <Card className="bg-white dark:bg-zinc-900 border shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <DollarSign className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle>Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {fmt(financing.valorTotal)}
              </p>
              <p className="text-sm text-gray-500">
                Corolla Cross XRE 2025
              </p>
            </CardContent>
          </Card>

          {/* ENTRADA */}
          <Card className="bg-white dark:bg-zinc-900 border shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <CreditCard className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle>Entrada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {fmt(financing.entrada)}
              </p>
              <p className="text-sm text-gray-500">
                {((financing.entrada / financing.valorTotal) * 100).toFixed(0)}% do valor
              </p>
            </CardContent>
          </Card>

          {/* PARCELAS */}
          <Card className="bg-white dark:bg-zinc-900 border shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle>Parcelas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {financing.parcelas}x de {fmt(financing.valorParcela)}
              </p>
              <p className="text-sm text-gray-500">
                Valor financiado: {fmt(financing.valorTotal - financing.entrada)}
              </p>
            </CardContent>
          </Card>

          {/* JUROS */}
          <Card className="bg-white dark:bg-zinc-900 border shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <Percent className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle>Taxa de Juros</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {financing.taxa}% a.m.
              </p>
              <p className="text-sm text-gray-500">
                {(financing.taxa * 12).toFixed(2)}% ao ano
              </p>
            </CardContent>
          </Card>

        </div>

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

export default FinancingPage;