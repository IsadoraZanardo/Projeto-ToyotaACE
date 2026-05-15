export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8083/api";

export type CadastroRequest = {
  nome: string;
  email: string;
  senha: string;
  cpf?: string;
  telefone?: string;
  endereco?: string;
};

export type VeiculoRequest = {
  modeloVeiculo: string;
  marcaVeiculo: string;
  anoVeiculo: string;
  corVeiculo: string;
  placaVeiculo: string;
  motorVeiculo: string;
  combustivelVeiculo: string;
  cambioVeiculo: string;
  fotoCarroUrl?: string;

  statusVeiculo: string;
  progressoVeiculo: number;

  valorTotal?: number;
  valorEntrada?: number;
  valorFinanciado?: number;

  parcelasTotais?: number;
  parcelasPagas?: number;
  parcelasRestantes?: number;

  valorParcela?: number;
  taxaJuros?: number;

  statusFinanciamento?: string;
  statusGarantia?: string;
  dataProximaRevisao?: string;
};

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = "Erro ao conectar ao servidor.";

    try {
      const data = await response.json();

      message =
        data?.message ||
        data?.erro ||
        data?.error ||
        message;
    } catch {}

    throw new Error(message);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export const api = {
  cadastrar: (dados: CadastroRequest) =>
    request("/clientes/cadastro", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  atualizarVeiculo: (
    clienteId: number,
    dados: VeiculoRequest
  ) =>
    request(`/veiculo/${clienteId}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),

  buscarVeiculo: (clienteId: number) =>
    request(`/veiculo/${clienteId}`),
};