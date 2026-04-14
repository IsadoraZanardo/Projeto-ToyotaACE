import { useState } from "react";
import { vehicles } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";
import { toast } from "sonner";

/* =========================
   DADOS
========================= */

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

/* =========================
   UTILS
========================= */

const formatPrice = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

/* =========================
   STATE
========================= */

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

/* =========================
   COMPONENTE
========================= */

const Vehicles = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState<
    typeof vehicles[0] | null
  >(null);

  const [config, setConfig] = useState(defaultState);

  const [selectedType, setSelectedType] =
    useState<keyof typeof vehicleVersions>("combustao");
  const [selectedVersion, setSelectedVersion] = useState("");

  const [vehiclePrices, setVehiclePrices] = useState<
    Record<number, number>
  >({});

  /* =========================
     FUNÇÕES
  ========================= */

  const openAccessorize = (v: typeof vehicles[0]) => {
    setSelectedVehicle(v);
    setConfig(defaultState);
    setDialogOpen(true);
  };

  const openVersionSelector = (v: typeof vehicles[0]) => {
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
    return vehiclePrices[id]
      ? formatPrice(vehiclePrices[id])
      : defaultPrice;
  };

  const totalAccessories = accessories
    .filter((a) => config.selectedAccessories.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  /* =========================
     UI
  ========================= */

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Catálogo de Veículos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="rounded-lg border bg-card overflow-hidden"
          >
            <img
              src={v.image}
              alt={v.name}
              className="w-full h-30 object-cover"
            />

            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">{v.name}</h3>
                <Badge>{v.category}</Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                {v.year}
              </p>

              <p className="text-lg font-bold text-primary mt-2">
                {getVehiclePrice(v.id, v.price)}
              </p>

              {/* BOTÕES */}
              <Button
                onClick={() => openAccessorize(v)}
                variant="outline"
                size="sm"
                className="w-full mt-2"
              >
                <Palette className="w-4 h-4 mr-1" />
                Acessorizar
              </Button>

              <Button
                onClick={() => openVersionSelector(v)}
                variant="outline"
                size="sm"
                className="w-full mt-2"
              >
                Escolher versão
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL ACESSÓRIOS */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              🚗 Acessorizar · {selectedVehicle?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
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

            {/* CORES */}
            <div className="space-y-2">
              <Label>Cor do veículo</Label>

              <div className="flex gap-3">
                {vehicleColors.map((c) => {
                  const isSelected = config.selectedColor === c.id;

                  return (
                    <div
                      key={c.id}
                      onClick={() =>
                        setConfig((p) => ({
                          ...p,
                          selectedColor: c.id,
                        }))
                      }
                      className={`w-8 h-8 rounded-full cursor-pointer border-2
                        ${
                          isSelected
                            ? "border-red-500 scale-110"
                            : "border-gray-300"
                        }
                      `}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* ACESSÓRIOS */}
            <div className="space-y-3">
              <Label>
                Acessórios ({config.selectedAccessories.length})
              </Label>

              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {accessories.map((a) => {
                  const isSelected =
                    config.selectedAccessories.includes(a.id);

                  return (
                    <div
                      key={a.id}
                      onClick={() => toggleAccessory(a.id)}
                      className={`p-3 rounded-xl border cursor-pointer
                        ${
                          isSelected
                            ? "border-red-500 bg-red-500/10"
                            : "border-gray-700 hover:border-gray-500"
                        }
                      `}
                    >
                      <span className="text-sm">{a.label}</span>
                      <p className="text-xs text-gray-400">
                        + {formatPrice(a.price)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOTAL */}
            <div className="p-3 rounded-xl bg-gray-900 border">
              <div className="flex justify-between">
                <span>Total acessórios</span>
                <span className="text-red-500 font-bold">
                  {formatPrice(totalAccessories)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>

            <Button
              onClick={() => {
                toast.success("Configuração salva");
                setDialogOpen(false);
              }}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL VERSÕES (mantido) */}
      <Dialog
        open={versionDialogOpen}
        onOpenChange={setVersionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Versões · {selectedVehicle?.name}
            </DialogTitle>
            <DialogDescription>
              Escolha o tipo e a versão
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              {Object.keys(vehicleVersions).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type as any);
                    setSelectedVersion("");
                  }}
                  className={`px-3 py-2 border rounded ${
                    selectedType === type
                      ? "border-primary bg-primary/10"
                      : ""
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {vehicleVersions[selectedType].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVersion(v.id)}
                  className={`p-2 border rounded ${
                    selectedVersion === v.id
                      ? "border-primary bg-primary/10"
                      : ""
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                const selected = vehicleVersions[
                  selectedType
                ].find((v) => v.id === selectedVersion);

                if (!selected || !selectedVehicle) return;

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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vehicles;