import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api, Cliente } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Factory, ClipboardCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import corolla from "@/assets/corolla.png";

const DashboardPage = () => {
  const { user, setUser } = useAuth();
  const [dados, setDados] = useState<Cliente | null>(user);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      if (!user?.email) return;
      try {
        const cliente = await api.buscarClientePorEmail(user.email);
        setDados(cliente);
        setUser(cliente);
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro ao carregar dados.");
      }
    }
    carregar();
  }, [setUser, user?.email]);

  const nome = dados?.nome?.split(" ")[0] || "Usuário";
  const modelo = dados?.modeloVeiculo || "Toyota Corolla Cross XRE";
  const status = dados?.statusVeiculo || "EM PRODUÇÃO";
  const progresso = dados?.progressoVeiculo ?? 45;

  const etapaAtual = useMemo(() => {
    if (progresso >= 90) return "Pronto para retirada";
    if (progresso >= 70) return "Concessionária";
    if (progresso >= 50) return "Transporte";
    if (progresso >= 25) return "Produção";
    return "Pedido realizado";
  }, [progresso]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Olá, {nome} 👋</h1>
            <p className="text-gray-500 mt-2">Acompanhe o status do seu veículo em tempo real.</p>
            {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white dark:bg-zinc-900 border shadow-sm hover:shadow-md transition">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30"><Car className="h-5 w-5 text-red-600" /></div>
                <CardTitle>Status do Veículo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{status}</p>
                <p className="text-sm text-gray-500 mt-1">{modelo}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border shadow-sm hover:shadow-md transition">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30"><Factory className="h-5 w-5 text-red-600" /></div>
                <CardTitle>Etapa Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{etapaAtual}</p>
                <div className="mt-3">
                  <Progress value={progresso} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{progresso}% concluído</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border shadow-sm hover:shadow-md transition">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30"><ClipboardCheck className="h-5 w-5 text-red-600" /></div>
                <CardTitle>Próximas Ações</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-gray-500">
                  <li>• Acompanhar atualização da fábrica</li>
                  <li>• Conferir dados do financiamento</li>
                  <li>• Agendar retirada quando liberado</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold text-red-600">{dados?.nome || "Cliente"}</h2>
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-zinc-800">
                <h3 className="font-semibold mb-2">Seu Veículo</h3>
                <p className="text-gray-700 dark:text-gray-300">{modelo}</p>
                <ul className="mt-2 text-sm text-gray-500 space-y-1">
                  <li>• {dados?.corVeiculo || "Cor não informada"}</li>
                  <li>• {dados?.motorVeiculo || "Motor não informado"}</li>
                  <li>• {dados?.cambioVeiculo || "Câmbio não informado"}</li>
                </ul>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <img src={dados?.fotoCarroUrl || corolla} alt={modelo} className="max-h-72 object-contain drop-shadow-xl" />
            </div>

            <div className="flex-1 text-center bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <p className="italic text-gray-600 dark:text-gray-300">"Revisar o carro novo é manter a garantia de fábrica e garantir sua segurança a longo prazo."</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">© {new Date().getFullYear()} Toyota do Brasil — Todos os direitos reservados</div>
      </footer>
    </div>
  );
};

export default DashboardPage;
