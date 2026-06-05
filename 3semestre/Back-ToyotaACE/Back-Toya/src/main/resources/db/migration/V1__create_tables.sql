CREATE TABLE IF NOT EXISTS clientes (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    senha VARCHAR(120) NOT NULL,
    cpf VARCHAR(20) UNIQUE,
    telefone VARCHAR(30),
    endereco VARCHAR(255)
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