import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api, Cliente } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  CreditCard,
  Car,
  Phone,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type PurchaseItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Purchase = {
  id: number;
  date: string;
  items: PurchaseItem[];
  total: number;
  paymentMethod: string;
};

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [dadosBanco, setDadosBanco] = useState<Cliente | null>(user);
  const [erro, setErro] = useState("");
  const [purchases, setPurchases] = useState<Purchase[]>([]);

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

  useEffect(() => {
    carregarCompras();
  }, []);

  const carregarCompras = () => {
    const savedPurchases = JSON.parse(
      localStorage.getItem("toyota_purchases") || "[]"
    );

    setPurchases(savedPurchases);
  };

  const limparHistorico = () => {
    localStorage.removeItem("toyota_purchases");
    setPurchases([]);
    toast.success("Histórico de compras apagado.");
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const paymentLabel = (method: string) => {
    const labels: Record<string, string> = {
      pix: "Pix",
      credito: "Cartão de crédito",
      debito: "Cartão de débito",
      boleto: "Boleto",
    };

    return labels[method] || method;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Perfil do Cliente
            </h1>

            <p className="text-gray-500 mt-2">
              Visualize suas informações, veículo e compras realizadas.
            </p>

            {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Dados Pessoais</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <Info
                  icon={<User className="h-5 w-5 text-red-600" />}
                  label="Nome"
                  value={dadosBanco?.nome}
                />

                <Info
                  icon={<Mail className="h-5 w-5 text-red-600" />}
                  label="Email"
                  value={dadosBanco?.email}
                />

                <Info
                  icon={<CreditCard className="h-5 w-5 text-red-600" />}
                  label="CPF"
                  value={dadosBanco?.cpf}
                />

                <Info
                  icon={<Phone className="h-5 w-5 text-red-600" />}
                  label="Telefone"
                  value={dadosBanco?.telefone}
                />
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Veículo Vinculado</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-3">
                  <Car className="h-6 w-6 text-red-600" />

                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {dadosBanco?.modeloVeiculo || "Modelo não informado"}
                    </p>

                    <p className="text-sm text-red-600 font-bold uppercase tracking-wider">
                      Status: {dadosBanco?.statusVeiculo || "Não informado"}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {dadosBanco?.corVeiculo || "Cor não informada"} •{" "}
                      {dadosBanco?.motorVeiculo || "Motor não informado"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white dark:bg-zinc-900 border shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-red-600" />
                  Compras realizadas na Toyota Shop
                </CardTitle>

                {purchases.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={limparHistorico}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpar histórico
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {purchases.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Nenhuma compra simulada foi realizada ainda.
                </p>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="rounded-lg border p-4 bg-card space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            Pedido #{purchase.id}
                          </p>

                          <p className="text-sm text-gray-500">
                            Data: {purchase.date}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="font-bold text-red-600">
                            {formatPrice(purchase.total)}
                          </p>

                          <p className="text-xs text-gray-500">
                            {paymentLabel(purchase.paymentMethod)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {purchase.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between text-sm border-t pt-2"
                          >
                            <span>
                              {item.quantity}x {item.name}
                            </span>

                            <span className="font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-black border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Toyota do Brasil — Todos os direitos
          reservados
        </div>
      </footer>
    </div>
  );
};

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}

      <div>
        <p className="text-sm text-gray-500">{label}</p>

        <p className="font-medium text-gray-900 dark:text-white">
          {value || "Não informado"}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;