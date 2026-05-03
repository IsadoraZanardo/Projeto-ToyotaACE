import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api, Cliente } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Percent, Calendar, CreditCard, ShieldCheck, Wrench } from "lucide-react";

const fmt = (v?: number) => (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const FinancingPage = () => {
  const { user } = useAuth();
  const [financing, setFinancing] = useState<Cliente | null>(user);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarFinanciamento() {
      if (!user?.email) return;
      try {
        const resposta = await api.buscarFinanciamentoPorEmail(user.email);
        setFinancing(resposta);
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro ao carregar financiamento.");
      }
    }
    carregarFinanciamento();
  }, [user?.email]);

  const valorTotal = financing?.valorTotal ?? 0;
  const entrada = financing?.valorEntrada ?? 0;
  const parcelas = financing?.parcelasTotais ?? 0;
  const valorParcela = financing?.valorParcela ?? 0;
  const taxa = financing?.taxaJuros ?? 0;
  const valorFinanciado = financing?.valorFinanciado ?? Math.max(valorTotal - entrada, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Simulação de Financiamento</h1>
            <p className="text-gray-500 mt-2">Veja os detalhes do financiamento do seu veículo.</p>
            {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <FinanceCard icon={<DollarSign className="h-5 w-5 text-red-600" />} title="Valor Total" value={fmt(valorTotal)} subtitle={financing?.modeloVeiculo || "Veículo Toyota"} />
            <FinanceCard icon={<CreditCard className="h-5 w-5 text-red-600" />} title="Entrada" value={fmt(entrada)} subtitle={valorTotal ? `${((entrada / valorTotal) * 100).toFixed(0)}% do valor` : "Não informado"} />
            <FinanceCard icon={<Calendar className="h-5 w-5 text-red-600" />} title="Parcelas" value={parcelas ? `${parcelas}x de ${fmt(valorParcela)}` : "Não informado"} subtitle={`Valor financiado: ${fmt(valorFinanciado)}`} />
            <FinanceCard icon={<Percent className="h-5 w-5 text-red-600" />} title="Taxa de Juros" value={taxa ? `${taxa}% a.m.` : "Não informado"} subtitle={taxa ? `${(taxa * 12).toFixed(2)}% ao ano` : ""} />
            <FinanceCard icon={<ShieldCheck className="h-5 w-5 text-red-600" />} title="Garantia" value={financing?.statusGarantia || "Não informado"} subtitle={`Financiamento: ${financing?.statusFinanciamento || "Não informado"}`} />
            <FinanceCard icon={<Wrench className="h-5 w-5 text-red-600" />} title="Próxima Revisão" value={financing?.dataProximaRevisao || "Não informado"} subtitle="Mantenha sua garantia ativa" />
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-border"><div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">© {new Date().getFullYear()} Toyota do Brasil — Todos os direitos reservados</div></footer>
    </div>
  );
};

function FinanceCard({ icon, title, value, subtitle }: { icon: React.ReactNode; title: string; value: string; subtitle?: string }) {
  return (
    <Card className="bg-white dark:bg-zinc-900 border shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

export default FinancingPage;
