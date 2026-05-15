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
    {
      id: "altis-hybrid",
      label: "Altis Hybrid",
      price: 189990,
    },

    {
      id: "altis-premium",
      label: "Altis Premium Hybrid",
      price: 199990,
    },
  ],

  combustao: [
    {
      id: "xr",
      label: "XR",
      price: 149990,
    },

    {
      id: "xei",
      label: "XEI",
      price: 164990,
    },
  ],

  grsport: [
    {
      id: "gr-s",
      label: "GR-Sport",
      price: 182990,
    },
  ],
};

const accessories = [
  {
    id: "camera-re",
    label: "Câmera de ré",
    price: 900,
  },

  {
    id: "sensor-est",
    label: "Sensor de estacionamento",
    price: 1200,
  },

  {
    id: "camera-360",
    label: "Câmera 360°",
    price: 2500,
  },

  {
    id: "teto-solar",
    label: "Teto solar",
    price: 8000,
  },

  {
    id: "tapetes",
    label: "Tapetes de borracha",
    price: 300,
  },

  {
    id: "rack",
    label: "Rack de teto",
    price: 1500,
  },

  {
    id: "engate",
    label: "Engate de reboque",
    price: 1800,
  },

  {
    id: "pelicula",
    label: "Película",
    price: 600,
  },

  {
    id: "alarme",
    label: "Alarme",
    price: 1300,
  },

  {
    id: "som",
    label: "Som premium",
    price: 3200,
  },
];

const vehicleColors = [
  {
    id: "branco",
    label: "Branco",
    hex: "#ffffff",
  },

  {
    id: "preto",
    label: "Preto",
    hex: "#000000",
  },

  {
    id: "prata",
    label: "Prata",
    hex: "#c0c0c0",
  },

  {
    id: "vermelho",
    label: "Vermelho",
    hex: "#ef4444",
  },
];

/* =========================
   UTILS
========================= */

const formatPrice = (
  value: number
) => {
  return value.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
};

const parsePrice = (
  price: string
) => {
  return Number(
    price
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );
};

/* =========================
   TYPES
========================= */

type AccessorizeState = {
  seatMaterial:
    | "tecido"
    | "couro"
    | "couro-sintetico";

  selectedAccessories: string[];

  selectedColor: string;
};

const defaultState: AccessorizeState =
  {
    seatMaterial: "tecido",

    selectedAccessories: [],

    selectedColor: "branco",
  };

/* =========================
   COMPONENT
========================= */

const Vehicles = () => {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [
    versionDialogOpen,
    setVersionDialogOpen,
  ] = useState(false);

  const [
    selectedVehicle,
    setSelectedVehicle,
  ] = useState<
    typeof vehicles[0] | null
  >(null);

  const [config, setConfig] =
    useState(defaultState);

  const [
    selectedType,
    setSelectedType,
  ] =
    useState<
      keyof typeof vehicleVersions
    >("combustao");

  const [
    selectedVersion,
    setSelectedVersion,
  ] = useState("");

  const [
    vehiclePrices,
    setVehiclePrices,
  ] = useState<
    Record<number, number>
  >({});

  /* =========================
     FUNÇÕES
  ========================= */

  const openAccessorize = (
    v: typeof vehicles[0]
  ) => {
    setSelectedVehicle(v);

    setConfig(defaultState);

    setDialogOpen(true);
  };

  const openVersionSelector = (
    v: typeof vehicles[0]
  ) => {
    setSelectedVehicle(v);

    setSelectedType("combustao");

    setSelectedVersion("");

    setVersionDialogOpen(true);
  };

  const toggleAccessory = (
    id: string
  ) => {
    setConfig((prev) => ({
      ...prev,

      selectedAccessories:
        prev.selectedAccessories.includes(
          id
        )
          ? prev.selectedAccessories.filter(
              (a) => a !== id
            )
          : [
              ...prev.selectedAccessories,
              id,
            ],
    }));
  };

  const getVehiclePrice = (
    id: number,
    defaultPrice: string
  ) => {
    return vehiclePrices[id]
      ? formatPrice(
          vehiclePrices[id]
        )
      : defaultPrice;
  };

  /* =========================
     CÁLCULOS
  ========================= */

  const totalAccessories =
    accessories
      .filter((a) =>
        config.selectedAccessories.includes(
          a.id
        )
      )
      .reduce(
        (sum, a) =>
          sum + a.price,
        0
      );

  const baseVehiclePrice =
    selectedVehicle
      ? vehiclePrices[
          selectedVehicle.id
        ]
        ? vehiclePrices[
            selectedVehicle.id
          ]
        : parsePrice(
            selectedVehicle.price
          )
      : 0;

  const totalFinal =
    baseVehiclePrice +
    totalAccessories;

  /* =========================
     UI
  ========================= */

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        Catálogo de Veículos
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="rounded-lg border bg-card overflow-hidden"
          >
            {/* IMAGEM */}
            <img
              src={v.image}
              alt={v.name}
              className="w-full h-48 object-cover"
            />

            {/* CONTEÚDO */}
            <div className="p-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-sm font-medium">
                    {v.name}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    {v.year}
                  </p>
                </div>

                <Badge>
                  {v.category}
                </Badge>
              </div>

              {/* PREÇO */}
              <p className="text-lg font-bold text-primary mt-3">
                {getVehiclePrice(
                  v.id,
                  v.price
                )}
              </p>

              {/* BOTÃO ACESSÓRIOS */}
              <Button
                onClick={() =>
                  openAccessorize(v)
                }
                variant="outline"
                size="sm"
                className="w-full mt-3"
              >
                <Palette className="w-4 h-4 mr-1" />

                Acessorizar
              </Button>

              {/* BOTÃO VERSÕES */}
              <Button
                onClick={() =>
                  openVersionSelector(v)
                }
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
      <Dialog
        open={dialogOpen}
        onOpenChange={
          setDialogOpen
        }
      >
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              🚗 Acessorizar ·{" "}
              {
                selectedVehicle?.name
              }
            </DialogTitle>

            <DialogDescription>
              Personalize o veículo
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* MATERIAL */}
            <div className="space-y-2">
              <Label>
                Material do banco
              </Label>

              <Select
                value={
                  config.seatMaterial
                }
                onValueChange={(
                  v
                ) =>
                  setConfig(
                    (p) => ({
                      ...p,

                      seatMaterial:
                        v as any,
                    })
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="tecido">
                    Tecido
                  </SelectItem>

                  <SelectItem value="couro">
                    Couro
                  </SelectItem>

                  <SelectItem value="couro-sintetico">
                    Couro sintético
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CORES */}
            <div className="space-y-2">
              <Label>
                Cor do veículo
              </Label>

              <div className="flex gap-3 flex-wrap">
                {vehicleColors.map(
                  (c) => {
                    const isSelected =
                      config.selectedColor ===
                      c.id;

                    return (
                      <div
                        key={c.id}
                        onClick={() =>
                          setConfig(
                            (p) => ({
                              ...p,

                              selectedColor:
                                c.id,
                            })
                          )
                        }
                        className={`
                          w-9 h-9 rounded-full cursor-pointer border-2 transition-all
                          ${
                            isSelected
                              ? "border-red-500 scale-110"
                              : "border-gray-300"
                          }
                        `}
                        style={{
                          backgroundColor:
                            c.hex,
                        }}
                      />
                    );
                  }
                )}
              </div>
            </div>

            {/* ACESSÓRIOS */}
            <div className="space-y-3">
              <Label>
                Acessórios (
                {
                  config
                    .selectedAccessories
                    .length
                }
                )
              </Label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {accessories.map(
                  (a) => {
                    const isSelected =
                      config.selectedAccessories.includes(
                        a.id
                      );

                    return (
                      <div
                        key={a.id}
                        onClick={() =>
                          toggleAccessory(
                            a.id
                          )
                        }
                        className={`
                          p-4 rounded-xl border cursor-pointer transition-all
                          ${
                            isSelected
                              ? "border-red-500 bg-red-500/10"
                              : "border-gray-700 hover:border-gray-500"
                          }
                        `}
                      >
                        <span className="text-sm font-medium">
                          {a.label}
                        </span>

                        <p className="text-xs text-gray-400 mt-1">
                          +{" "}
                          {formatPrice(
                            a.price
                          )}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* TOTAL */}
            <div className="p-4 rounded-xl bg-gray-900 border space-y-3">
              <div className="flex justify-between">
                <span>
                  Valor do carro
                </span>

                <span className="font-medium">
                  {formatPrice(
                    baseVehiclePrice
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  Total acessórios
                </span>

                <span className="text-red-500 font-bold">
                  {formatPrice(
                    totalAccessories
                  )}
                </span>
              </div>

              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>
                  Total final
                </span>

                <span className="text-green-500">
                  {formatPrice(
                    totalFinal
                  )}
                </span>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() =>
                  setDialogOpen(
                    false
                  )
                }
              >
                Cancelar
              </Button>

              <Button
                onClick={() => {
                  toast.success(
                    "Configuração salva"
                  );

                  setDialogOpen(
                    false
                  );
                }}
              >
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL VERSÕES */}
      <Dialog
        open={
          versionDialogOpen
        }
        onOpenChange={
          setVersionDialogOpen
        }
      >
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              Versões ·{" "}
              {
                selectedVehicle?.name
              }
            </DialogTitle>

            <DialogDescription>
              Escolha o tipo e
              versão
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* TIPOS */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(
                vehicleVersions
              ).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(
                      type as any
                    );

                    setSelectedVersion(
                      ""
                    );
                  }}
                  className={`
                    px-4 py-2 rounded-lg border transition-all capitalize
                    ${
                      selectedType ===
                      type
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/40"
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* VERSÕES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicleVersions[
                selectedType
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() =>
                    setSelectedVersion(
                      v.id
                    )
                  }
                  className={`
                    p-4 rounded-xl border text-left transition-all
                    ${
                      selectedVersion ===
                      v.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/40"
                    }
                  `}
                >
                  <p className="font-semibold">
                    {v.label}
                  </p>

                  <p className="text-sm text-muted-foreground mt-1">
                    {formatPrice(
                      v.price
                    )}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* CONFIRMAR */}
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => {
                const selected =
                  vehicleVersions[
                    selectedType
                  ].find(
                    (v) =>
                      v.id ===
                      selectedVersion
                  );

                if (
                  !selected ||
                  !selectedVehicle
                )
                  return;

                setVehiclePrices(
                  (prev) => ({
                    ...prev,

                    [selectedVehicle.id]:
                      selected.price,
                  })
                );

                toast.success(
                  "Versão escolhida"
                );

                setVersionDialogOpen(
                  false
                );
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