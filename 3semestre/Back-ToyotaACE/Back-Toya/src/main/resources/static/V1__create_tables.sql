CREATE TABLE clientes (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    cpf VARCHAR(14),
    modelo_carro VARCHAR(50),
    foto_carro_url TEXT,
    status_veiculo VARCHAR(50) DEFAULT 'PRENSA', 
    valor_financiado DOUBLE PRECISION, -- Mudamos aqui para DOUBLE PRECISION
    parcelas_restantes INTEGER,
    status_garantia VARCHAR(50),
    data_proxima_revisao VARCHAR(20)
);

-- Insere o dado de teste
INSERT INTO clientes (nome, email, senha, modelo_carro, status_veiculo, valor_financiado, parcelas_restantes) 
VALUES ('Isabelle Nastri Barros', 'nastrisalesisabelle@gmail.com', '123456', 'Toyota Corolla Cross', 'QUALIDADE', 150000.00, 36);