CREATE TABLE IF NOT EXISTS clientes (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    senha VARCHAR(120) NOT NULL,
    cpf VARCHAR(20) UNIQUE,
    telefone VARCHAR(30),
    endereco VARCHAR(255),

    modelo_veiculo VARCHAR(100),
    marca_veiculo VARCHAR(60),
    ano_veiculo VARCHAR(10),
    cor_veiculo VARCHAR(40),
    placa_veiculo VARCHAR(20),
    chassi_veiculo VARCHAR(80),
    motor_veiculo VARCHAR(100),
    combustivel_veiculo VARCHAR(60),
    cambio_veiculo VARCHAR(60),
    foto_carro_url TEXT,
    status_veiculo VARCHAR(60),
    progresso_veiculo INTEGER,

    valor_total NUMERIC(12,2),
    valor_entrada NUMERIC(12,2),
    valor_financiado NUMERIC(12,2),
    parcelas_totais INTEGER,
    parcelas_pagas INTEGER,
    parcelas_restantes INTEGER,
    valor_parcela NUMERIC(12,2),
    taxa_juros DOUBLE PRECISION,
    status_financiamento VARCHAR(60),
    status_garantia VARCHAR(60),
    data_proxima_revisao VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS agendamentos (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    tipo_servico VARCHAR(100) NOT NULL,
    observacao TEXT,
    status VARCHAR(40)
);

INSERT INTO clientes (
    nome, email, senha, cpf, telefone, endereco,
    modelo_veiculo, marca_veiculo, ano_veiculo, cor_veiculo, placa_veiculo,
    chassi_veiculo, motor_veiculo, combustivel_veiculo, cambio_veiculo,
    foto_carro_url, status_veiculo, progresso_veiculo,
    valor_total, valor_entrada, valor_financiado, parcelas_totais,
    parcelas_pagas, parcelas_restantes, valor_parcela, taxa_juros,
    status_financiamento, status_garantia, data_proxima_revisao
) VALUES (
    'Isabelle Nastri', 'nastrisalesisabelle@gmail.com', '123456', '123.456.789-00', '(11) 99999-9999', 'Osasco - SP',
    'Toyota Corolla Cross XRE', 'Toyota', '2025', 'Prata', 'BRA2E25',
    '9BRXXXXXXXXXXXXXXXX', '2.0 Flex - 177cv', 'Flex', 'Automático CVT',
    'https://www.toyota.com.br/content/dam/toyota/models/corolla-cross/my25/overview/CorollaCross_Hybrid.png',
    'PINTURA', 45,
    189990.00, 50000.00, 139990.00, 48,
    12, 36, 3845.62, 1.29,
    'EM DIA', 'ATIVA', '2026-08-15'
)
ON CONFLICT (email) DO NOTHING;
