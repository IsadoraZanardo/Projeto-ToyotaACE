import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api, Cliente } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, CreditCard, Car, Phone, MapPin } from "lucide-react";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [dadosBanco, setDadosBanco] = useState<Cliente | null>(user);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      if (!user?.email) return;
      try {
        const resultado = await api.buscarClientePorEmail(user.email);
        setDadosBanco(resultado);
        setUser(resultado);
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro ao buscar perfil.");
      }
    }
    carregarDados();
  }, [setUser, user?.email]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Perfil do Cliente</h1>
            <p className="text-gray-500 mt-2">Visualize suas informações e dados do veículo vindos do sistema Toyota.</p>
            {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader><CardTitle className="text-lg">Dados Pessoais</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Info icon={<User className="h-5 w-5 text-red-600" />} label="Nome" value={dadosBanco?.nome} />
                <Info icon={<Mail className="h-5 w-5 text-red-600" />} label="Email" value={dadosBanco?.email} />
                <Info icon={<CreditCard className="h-5 w-5 text-red-600" />} label="CPF" value={dadosBanco?.cpf} />
                <Info icon={<Phone className="h-5 w-5 text-red-600" />} label="Telefone" value={dadosBanco?.telefone} />
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader><CardTitle className="text-lg">Veículo Vinculado</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Car className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{dadosBanco?.modeloVeiculo || "Modelo não informado"}</p>
                    <p className="text-sm text-red-600 font-bold uppercase tracking-wider">Status: {dadosBanco?.statusVeiculo || "Não informado"}</p>
                    <p className="text-xs text-gray-500 mt-1">{dadosBanco?.corVeiculo || "Cor não informada"} • {dadosBanco?.motorVeiculo || "Motor não informado"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-border"><div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">© {new Date().getFullYear()} Toyota do Brasil — Todos os direitos reservados</div></footer>
    </div>
  );
};

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900 dark:text-white">{value || "Não informado"}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
