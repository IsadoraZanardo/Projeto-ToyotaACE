package br.com.toyota.toyota_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(unique = true, nullable = false, length = 120)
    private String email;

    @Column(nullable = false, length = 120)
    private String senha;

    @Column(unique = true, length = 20)
    private String cpf;

    private String telefone;
    private String endereco;

    // Dados do veículo
    private String modeloVeiculo;
    private String marcaVeiculo;
    private String anoVeiculo;
    private String corVeiculo;
    private String placaVeiculo;
    private String chassiVeiculo;
    private String motorVeiculo;
    private String combustivelVeiculo;
    private String cambioVeiculo;
    private String fotoCarroUrl;
    private String statusVeiculo;
    private Integer progressoVeiculo;

    // Dados de financiamento / pós-venda
    private BigDecimal valorTotal;
    private BigDecimal valorEntrada;
    private BigDecimal valorFinanciado;
    private Integer parcelasTotais;
    private Integer parcelasPagas;
    private Integer parcelasRestantes;
    private BigDecimal valorParcela;
    private Double taxaJuros;
    private String statusFinanciamento;
    private String statusGarantia;
    private String dataProximaRevisao;
}
