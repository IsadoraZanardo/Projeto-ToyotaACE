export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8083/api";

export type Cliente = {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  cpf?: string;
  telefone?: string;
  endereco?: string;
};

export type Veiculo = {
  id?: number;
  cliente?: Cliente;

  modeloVeiculo?: string;
  marcaVeiculo?: string;
  anoVeiculo?: string;
  corVeiculo?: string;
  placaVeiculo?: string;
  chassiVeiculo?: string;
  motorVeiculo?: string;
  combustivelVeiculo?: string;
  cambioVeiculo?: string;
  fotoCarroUrl?: string;
  statusVeiculo?: string;
  progressoVeiculo?: number;

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

  acessorios?: string;
  vinIot?: string;
};

export type CadastroRequest = {
  nome: string;
  email: string;
  senha: string;
  cpf?: string;
  telefone?: string;
  endereco?: string;
};

export type VeiculoRequest = {
  clienteId: number;

  modeloVeiculo: string;
  marcaVeiculo: string;
  anoVeiculo: string;
  corVeiculo: string;
  placaVeiculo?: string;
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

  acessorios?: string;
  vinIot?: string;
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
      message = data?.message || data?.erro || data?.error || message;
    } catch {}

    throw new Error(message);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export const api = {
  listarClientes: () => request<Cliente[]>("/clientes"),

  cadastrar: (dados: CadastroRequest) =>
    request<Cliente>("/clientes/cadastro", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  atualizarCliente: (id: number, dados: Partial<Cliente>) =>
    request<Cliente>(`/clientes/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),

  deletarCliente: (id: number) =>
    request<void>(`/clientes/${id}`, {
      method: "DELETE",
    }),

  cadastrarVeiculo: (dados: VeiculoRequest) =>
    request<Veiculo>("/veiculos", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  listarVeiculosCliente: (clienteId: number) =>
    request<Veiculo[]>(`/veiculos/cliente/${clienteId}`),

  buscarVeiculo: (veiculoId: number) =>
    request<Veiculo>(`/veiculos/${veiculoId}`),

  atualizarVeiculo: (veiculoId: number, dados: Partial<VeiculoRequest>) =>
    request<Veiculo>(`/veiculos/${veiculoId}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),

  deletarVeiculo: (veiculoId: number) =>
    request<void>(`/veiculos/${veiculoId}`, {
      method: "DELETE",
    }),
};