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
   FORMATADOR
========================= */

const formatPrice = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
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

const defaultState: AccessorizeState = {
  seatMaterial: "tecido",

  selectedAccessories: [],

  selectedColor: "",
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
  ] = useState<any>(null);

  const [config, setConfig] =
    useState(defaultState);

  const [
    selectedVersion,
    setSelectedVersion,
  ] = useState<any>(null);

  /* =========================
     OPEN MODALS
  ========================= */

  const openAccessorize = (
    vehicle: any
  ) => {
    setSelectedVehicle(vehicle);

    setConfig(defaultState);

    setDialogOpen(true);
  };

  const openVersionSelector = (
    vehicle: any
  ) => {
    setSelectedVehicle(vehicle);

    setSelectedVersion(null);

    setVersionDialogOpen(true);
  };

  /* =========================
     ACCESSORIES
  ========================= */

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

  /* =========================
     ACCESSORIES TOTAL
  ========================= */

  const totalAccessories =
    selectedVehicle?.accessories
      ?.filter((a: any) =>
        config.selectedAccessories.includes(
          a.id
        )
      )

      .reduce(
        (
          sum: number,
          a: any
        ) => sum + a.price,
        0
      ) || 0;

  /* =========================
     BASE PRICE
  ========================= */

  const basePrice =
    selectedVersion?.price ||

    parseFloat(
      selectedVehicle?.price
        ?.replace("R$", "")
        ?.replace(/\./g, "")
        ?.replace(",", ".") || "0"
    );

  /* =========================
     FINAL TOTAL
  ========================= */

  const totalPrice =
    basePrice +
    totalAccessories;

  /* =========================
     UI
  ========================= */

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        Catálogo de Veículos
      </h1>

      {/* GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v: any) => (
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
                <h3 className="text-sm font-medium">
                  {v.name}
                </h3>

                <Badge>
                  {v.category}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                {v.year}
              </p>

              <p className="text-lg font-bold text-primary mt-2">
                {selectedVersion &&
                selectedVehicle?.id ===
                  v.id
                  ? formatPrice(
                      selectedVersion.price
                    )
                  : v.price}
              </p>

              {/* BOTÃO ACESSORIZAR */}

              <Button
                onClick={() =>
                  openAccessorize(v)
                }
                variant="outline"
                size="sm"
                className="w-full mt-2"
              >
                <Palette className="w-4 h-4 mr-1" />
                Acessorizar
              </Button>

              {/* BOTÃO VERSÃO */}

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
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              🚗 Acessorizar ·{" "}
              {selectedVehicle?.name}
            </DialogTitle>
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
                onValueChange={(v) =>
                  setConfig((p) => ({
                    ...p,

                    seatMaterial:
                      v as any,
                  }))
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

              <div className="flex gap-3">
                {selectedVehicle?.colors?.map(
                  (c: any) => {
                    const isSelected =
                      config.selectedColor ===
                      c.id;

                    return (
                      <div
                        key={c.id}
                        onClick={() =>
                          setConfig((p) => ({
                            ...p,

                            selectedColor:
                              c.id,
                          }))
                        }
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all
                        ${
                          isSelected
                            ? "border-primary scale-110"
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

              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {selectedVehicle?.accessories?.map(
                  (a: any) => {
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
                        className={`p-3 rounded-xl border cursor-pointer transition-all
                        ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-gray-700 hover:border-gray-500"
                        }
                      `}
                      >
                        <span className="text-sm">
                          {a.label}
                        </span>

                        <p className="text-xs text-muted-foreground">
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

            {/* RESUMO */}

            <div className="p-4 rounded-xl bg-gray-900 border space-y-4">

              {/* MODELO */}

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Modelo
                </p>

                <p className="font-medium">
                  {selectedVersion?.label ||
                    "Não selecionado"}
                </p>
              </div>

              {/* COR */}

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Cor
                </p>

                <p className="font-medium">
                  {
                    selectedVehicle?.colors?.find(
                      (c: any) =>
                        c.id ===
                        config.selectedColor
                    )?.label ||
                      "Não selecionada"
                  }
                </p>
              </div>

              {/* ACESSÓRIOS SELECIONADOS */}

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Acessórios
                </p>

                <div className="flex flex-wrap gap-2">
                  {config.selectedAccessories
                    .length > 0 ? (
                    config.selectedAccessories.map(
                      (id) => {
                        const accessory =
                          selectedVehicle?.accessories?.find(
                            (a: any) =>
                              a.id === id
                          );

                        return (
                          <div
                            key={id}
                            className="px-2 py-1 rounded-md bg-primary/10 text-xs border border-primary/20"
                          >
                            {
                              accessory?.label
                            }
                          </div>
                        );
                      }
                    )
                  ) : (
                    <p className="text-sm">
                      Nenhum acessório
                    </p>
                  )}
                </div>
              </div>

              {/* PREÇOS */}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Veículo
                  </span>

                  <span>
                    {formatPrice(
                      basePrice
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>
                    Acessórios
                  </span>

                  <span>
                    {formatPrice(
                      totalAccessories
                    )}
                  </span>
                </div>

                <div className="border-t pt-2 flex justify-between font-bold text-base">
                  <span>
                    Total
                  </span>

                  <span className="text-primary">
                    {formatPrice(
                      totalPrice
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() =>
                setDialogOpen(false)
              }
            >
              Cancelar
            </Button>

            <Button
              onClick={() => {
                toast.success(
                  "Configuração salva"
                );

                setDialogOpen(false);
              }}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL VERSÕES */}

      <Dialog
        open={versionDialogOpen}
        onOpenChange={
          setVersionDialogOpen
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Versões ·{" "}
              {selectedVehicle?.name}
            </DialogTitle>

            <DialogDescription>
              Escolha a versão
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2">
            {selectedVehicle?.versions?.map(
              (v: any) => (
                <button
                  key={v.id}
                  onClick={() =>
                    setSelectedVersion(
                      v
                    )
                  }
                  className={`p-3 border rounded transition-all
                  ${
                    selectedVersion?.id ===
                    v.id
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary/50"
                  }
                `}
                >
                  <div className="font-medium">
                    {v.label}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {formatPrice(
                      v.price
                    )}
                  </div>
                </button>
              )
            )}
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
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