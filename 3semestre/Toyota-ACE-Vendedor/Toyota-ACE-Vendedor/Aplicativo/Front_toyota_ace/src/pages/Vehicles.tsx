import { useEffect, useState } from "react";
import { vehicles } from "@/lib/mock-data";
import { api } from "@/services/api";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Palette, Save, Settings } from "lucide-react";
import { toast } from "sonner";

const vehicleVersions = {
  hibrido: [
    { id: "altis-hybrid", label: "Altis Hybrid", price: 189990 },
    { id: "altis-premium", label: "Altis Premium Hybrid", price: 199990 },
  ],
  combustao: [
    { id: "xr", label: "XR", price: 149990 },
    { id: "xei", label: "XEI", price: 164990 },
  ],
  grsport: [{ id: "gr-s", label: "GR-Sport", price: 182990 }],
};

const accessories = [
  { id: "camera-re", label: "Câmera de ré", price: 900 },
  { id: "sensor-est", label: "Sensor de estacionamento", price: 1200 },
  { id: "camera-360", label: "Câmera 360°", price: 2500 },
  { id: "teto-solar", label: "Teto solar", price: 8000 },
  { id: "tapetes", label: "Tapetes de borracha", price: 300 },
  { id: "rack", label: "Rack de teto", price: 1500 },
  { id: "engate", label: "Engate de reboque", price: 1800 },
  { id: "pelicula", label: "Película", price: 600 },
  { id: "alarme", label: "Alarme", price: 1300 },
  { id: "som", label: "Som premium", price: 3200 },
];

const vehicleColors = [
  { id: "branco", label: "Branco", hex: "#ffffff" },
  { id: "preto", label: "Preto", hex: "#000000" },
  { id: "prata", label: "Prata", hex: "#c0c0c0" },
  { id: "vermelho", label: "Vermelho", hex: "#ef4444" },
];

const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const parsePrice = (price: string) =>
  Number(
    price
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );

type AccessorizeState = {
  seatMaterial: "tecido" | "couro" | "couro-sintetico";
  selectedAccessories: string[];
  selectedColor: string;
};

const defaultState: AccessorizeState = {
  seatMaterial: "tecido",
  selectedAccessories: [],
  selectedColor: "branco",
};

const Vehicles = () => {
  const [clients, setClients] = useState<any[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState<
    (typeof vehicles)[0] | null
  >(null);

  const [config, setConfig] = useState(defaultState);

  const [selectedType, setSelectedType] =
    useState<keyof typeof vehicleVersions>("combustao");

  const [selectedVersion, setSelectedVersion] = useState("");

  const [vehiclePrices, setVehiclePrices] = useState<Record<number, number>>(
    {}
  );

  const [selectedClientId, setSelectedClientId] = useState<string>(
    localStorage.getItem("toyota_selected_client_id") || ""
  );

  const [finance, setFinance] = useState({
    valorEntrada: "20000",
    parcelasTotais: "48",
    parcelasPagas: "0",
    taxaJuros: "1.49",
    statusFinanciamento: "ATIVO",
    statusGarantia: "ATIVA",
    dataProximaRevisao: "2026-12-20",
    statusVeiculo: "Pedido realizado",
    progressoVeiculo: "25",
    placaVeiculo: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const data = await api.listarClientes();
        setClients(data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        toast.error("Erro ao carregar clientes.");
      }
    };

    carregarClientes();
  }, []);

  const openAccessorize = (v: (typeof vehicles)[0]) => {
    setSelectedVehicle(v);
    setConfig(defaultState);
    setDialogOpen(true);
  };

  const openVersionSelector = (v: (typeof vehicles)[0]) => {
    setSelectedVehicle(v);
    setSelectedType("combustao");
    setSelectedVersion("");
    setVersionDialogOpen(true);
  };

  const toggleAccessory = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      selectedAccessories: prev.selectedAccessories.includes(id)
        ? prev.selectedAccessories.filter((a) => a !== id)
        : [...prev.selectedAccessories, id],
    }));
  };

  const getVehiclePrice = (id: number, defaultPrice: string) => {
    return vehiclePrices[id] ? formatPrice(vehiclePrices[id]) : defaultPrice;
  };

  const totalAccessories = accessories
    .filter((a) => config.selectedAccessories.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const baseVehiclePrice = selectedVehicle
    ? vehiclePrices[selectedVehicle.id]
      ? vehiclePrices[selectedVehicle.id]
      : parsePrice(selectedVehicle.price)
    : 0;

  const totalFinal = baseVehiclePrice + totalAccessories;

  const selectedColorLabel =
    vehicleColors.find((c) => c.id === config.selectedColor)?.label || "Branco";

  const selectedVersionLabel =
    Object.values(vehicleVersions)
      .flat()
      .find((v) => v.price === baseVehiclePrice)?.label || "Versão padrão";

  const calcularFinanciamento = () => {
    const valorTotal = totalFinal;
    const entrada = Number(finance.valorEntrada || 0);
    const parcelasTotais = Number(finance.parcelasTotais || 0);
    const parcelasPagas = Number(finance.parcelasPagas || 0);
    const taxaJuros = Number(finance.taxaJuros || 0);

    const valorFinanciado = Math.max(valorTotal - entrada, 0);
    const parcelasRestantes = Math.max(parcelasTotais - parcelasPagas, 0);

    const valorParcela =
      parcelasTotais > 0
        ? (valorFinanciado * (1 + taxaJuros / 100)) / parcelasTotais
        : 0;

    return {
      valorTotal,
      valorEntrada: entrada,
      valorFinanciado,
      parcelasTotais,
      parcelasPagas,
      parcelasRestantes,
      valorParcela,
      taxaJuros,
    };
  };

  const handleSalvarConfiguracao = async () => {
    if (!selectedVehicle) {
      toast.error("Selecione um veículo.");
      return;
    }

    if (!selectedClientId) {
      toast.error("Selecione um cliente para atribuir o veículo.");
      return;
    }

    try {
      setLoading(true);

      const calculo = calcularFinanciamento();

      await api.atualizarVeiculo(Number(selectedClientId), {
        modeloVeiculo: selectedVehicle.name,
        marcaVeiculo: "Toyota",
        anoVeiculo: String(selectedVehicle.year || "2026"),
        corVeiculo: selectedColorLabel,
        placaVeiculo: finance.placaVeiculo,
        motorVeiculo:
          selectedType === "hibrido"
            ? "Motor híbrido Toyota"
            : "Motor 2.0 Flex",
        combustivelVeiculo:
          selectedType === "hibrido" ? "Híbrido/Flex" : "Flex",
        cambioVeiculo: "Automático",
        fotoCarroUrl: selectedVehicle.image,
        statusVeiculo: finance.statusVeiculo,
        progressoVeiculo: Number(finance.progressoVeiculo || 0),

        valorTotal: calculo.valorTotal,
        valorEntrada: calculo.valorEntrada,
        valorFinanciado: calculo.valorFinanciado,
        parcelasTotais: calculo.parcelasTotais,
        parcelasPagas: calculo.parcelasPagas,
        parcelasRestantes: calculo.parcelasRestantes,
        valorParcela: calculo.valorParcela,
        taxaJuros: calculo.taxaJuros,
        statusFinanciamento: finance.statusFinanciamento,
        statusGarantia: finance.statusGarantia,
        dataProximaRevisao: finance.dataProximaRevisao,
      });

      toast.success("Veículo e financiamento salvos para o cliente!");
      setDialogOpen(false);
      localStorage.removeItem("toyota_selected_client_id");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao salvar veículo no backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const calculo = calcularFinanciamento();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Catálogo de Veículos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="rounded-lg border bg-card overflow-hidden">
            <img
              src={v.image}
              alt={v.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-sm font-medium">{v.name}</h3>
                  <p className="text-xs text-muted-foreground">{v.year}</p>
                </div>

                <Badge>{v.category}</Badge>
              </div>

              <p className="text-lg font-bold text-primary mt-3">
                {getVehiclePrice(v.id, v.price)}
              </p>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => openVersionSelector(v)}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Versão
                </Button>

                <Button className="flex-1" onClick={() => openAccessorize(v)}>
                  <Palette className="h-4 w-4 mr-1" />
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>🚗 Configurar veículo · {selectedVehicle?.name}</DialogTitle>
            <DialogDescription>
              Atribua o carro a um cliente e configure financiamento, status e
              pós-venda.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Cliente responsável</Label>

              <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>

                <SelectContent>
                  {clients
                    .filter((client: any) => client.id)
                    .map((client: any) => (
                      <SelectItem key={client.id} value={String(client.id)}>
                        {client.nome} · {client.telefone || client.email}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cor do veículo</Label>

                <div className="flex gap-3 flex-wrap">
                  {vehicleColors.map((c) => {
                    const isSelected = config.selectedColor === c.id;

                    return (
                      <button
                        key={c.id}
                        onClick={() =>
                          setConfig((p) => ({
                            ...p,
                            selectedColor: c.id,
                          }))
                        }
                        className={`w-10 h-10 rounded-full border-2 ${
                          isSelected ? "border-primary" : "border-border"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Material do banco</Label>

                <Select
                  value={config.seatMaterial}
                  onValueChange={(v) =>
                    setConfig((p) => ({
                      ...p,
                      seatMaterial: v as any,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="tecido">Tecido</SelectItem>
                    <SelectItem value="couro">Couro</SelectItem>
                    <SelectItem value="couro-sintetico">
                      Couro sintético
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Acessórios</Label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {accessories.map((a) => {
                  const selected = config.selectedAccessories.includes(a.id);

                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAccessory(a.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <p className="text-sm font-medium">{a.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(a.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-2">
                <Label>Status do veículo</Label>

                <Select
                  value={finance.statusVeiculo}
                  onValueChange={(value) =>
                    setFinance({ ...finance, statusVeiculo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Pedido realizado">
                      Pedido realizado
                    </SelectItem>
                    <SelectItem value="Em produção">Em produção</SelectItem>
                    <SelectItem value="Inspeção">Inspeção</SelectItem>
                    <SelectItem value="Pronto para retirada">
                      Pronto para retirada
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Progresso do veículo (%)</Label>

                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={finance.progressoVeiculo}
                  onChange={(e) =>
                    setFinance({
                      ...finance,
                      progressoVeiculo: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Placa</Label>

                <Input
                  placeholder="Opcional"
                  value={finance.placaVeiculo}
                  onChange={(e) =>
                    setFinance({ ...finance, placaVeiculo: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Próxima revisão</Label>

                <Input
                  type="date"
                  value={finance.dataProximaRevisao}
                  onChange={(e) =>
                    setFinance({
                      ...finance,
                      dataProximaRevisao: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-2">
                <Label>Valor de entrada</Label>

                <Input
                  type="number"
                  value={finance.valorEntrada}
                  onChange={(e) =>
                    setFinance({ ...finance, valorEntrada: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Parcelas totais</Label>

                <Input
                  type="number"
                  value={finance.parcelasTotais}
                  onChange={(e) =>
                    setFinance({ ...finance, parcelasTotais: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Parcelas pagas</Label>

                <Input
                  type="number"
                  value={finance.parcelasPagas}
                  onChange={(e) =>
                    setFinance({ ...finance, parcelasPagas: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Taxa de juros (%)</Label>

                <Input
                  type="number"
                  step="0.01"
                  value={finance.taxaJuros}
                  onChange={(e) =>
                    setFinance({ ...finance, taxaJuros: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Status financiamento</Label>

                <Select
                  value={finance.statusFinanciamento}
                  onValueChange={(value) =>
                    setFinance({ ...finance, statusFinanciamento: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="ATIVO">Ativo</SelectItem>
                    <SelectItem value="QUITADO">Quitado</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status garantia</Label>

                <Select
                  value={finance.statusGarantia}
                  onValueChange={(value) =>
                    setFinance({ ...finance, statusGarantia: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="ATIVA">Ativa</SelectItem>
                    <SelectItem value="EXPIRADA">Expirada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border p-4 bg-muted/40 text-sm space-y-1">
              <p>
                <strong>Valor do veículo:</strong> {formatPrice(baseVehiclePrice)}
              </p>
              <p>
                <strong>Acessórios:</strong> {formatPrice(totalAccessories)}
              </p>
              <p>
                <strong>Total:</strong> {formatPrice(calculo.valorTotal)}
              </p>
              <p>
                <strong>Valor financiado:</strong>{" "}
                {formatPrice(calculo.valorFinanciado)}
              </p>
              <p>
                <strong>Valor da parcela:</strong>{" "}
                {formatPrice(calculo.valorParcela)}
              </p>
              <p>
                <strong>Parcelas restantes:</strong>{" "}
                {calculo.parcelasRestantes}
              </p>
              <p>
                <strong>Versão:</strong> {selectedVersionLabel}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>

            <Button onClick={handleSalvarConfiguracao} disabled={loading}>
              <Save className="h-4 w-4 mr-1" />
              {loading ? "Salvando..." : "Salvar configuração"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={versionDialogOpen} onOpenChange={setVersionDialogOpen}>
        <DialogContent className="w-[95vw] max-w-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>Escolher versão · {selectedVehicle?.name}</DialogTitle>

            <DialogDescription>
              Escolha o tipo e a versão do veículo.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="flex gap-2 flex-wrap">
              {Object.keys(vehicleVersions).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type as keyof typeof vehicleVersions);
                    setSelectedVersion("");
                  }}
                  className={`px-4 py-2 rounded-lg border transition-all capitalize ${
                    selectedType === type
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicleVersions[selectedType].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVersion(v.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedVersion === v.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <p className="font-semibold">{v.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatPrice(v.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                const selected = vehicleVersions[selectedType].find(
                  (v) => v.id === selectedVersion
                );

                if (!selected || !selectedVehicle) {
                  toast.error("Escolha uma versão.");
                  return;
                }

                setVehiclePrices((prev) => ({
                  ...prev,
                  [selectedVehicle.id]: selected.price,
                }));

                toast.success("Versão escolhida");
                setVersionDialogOpen(false);
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vehicles;