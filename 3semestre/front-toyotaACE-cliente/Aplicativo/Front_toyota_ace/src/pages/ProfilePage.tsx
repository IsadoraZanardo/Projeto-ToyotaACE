import React, { useEffect, useState } from "react"; // 1. Adicionamos useEffect e useState
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, CreditCard, Car } from "lucide-react";
import { getAcompanhamento } from "@/services/api"; // 2. IMPORTAMOS sua função do Passo 1

const ProfilePage = () => {
  const { user } = useAuth();
  
  // --- CONEXÃO COM O BACK: Estado para guardar os dados do banco ---
  const [dadosBanco, setDadosBanco] = useState<any>(null);

  useEffect(() => {
    async function carregarDados() {
      if (user?.email) {
        // Busca os dados usando o e-mail do usuário logado
        const resultado = await getAcompanhamento(user.email);
        setDadosBanco(resultado);
      }
    }
    carregarDados();
  }, [user?.email]);
  // -------------------------------------------------------------

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Perfil do Cliente
            </h1>
            <p className="text-gray-500 mt-2">
              Visualize suas informações e dados do veículo vindos do sistema Toyota.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* DADOS PESSOAIS */}
            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {/* Prioriza o nome do banco de dados */}
                      {dadosBanco?.nome || user?.name || "Não informado"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.email || "Não informado"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">CPF</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {/* CPF vindo do banco (Java) */}
                      {dadosBanco?.cpf || "Carregando..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* VEÍCULO */}
            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Veículo Vinculado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Car className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {/* Modelo vindo do banco (Java) */}
                      {dadosBanco?.modeloVeiculo || "Corolla Cross XRE 2025"}
                    </p>
                    <p className="text-sm text-red-600 font-bold uppercase tracking-wider">
                      {/* Status de produção dinâmico! */}
                      Status: {dadosBanco?.statusVeiculo || "PINTURA"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Branco Pérola • 2.0 Flex
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Toyota do Brasil — Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;