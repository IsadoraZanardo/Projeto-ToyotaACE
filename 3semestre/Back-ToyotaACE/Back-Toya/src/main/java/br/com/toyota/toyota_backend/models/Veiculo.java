package br.com.toyota.toyota_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "veiculos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // RELAÇÃO COM CLIENTE
    // =========================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    @JsonBackReference
    private Cliente cliente;

    // =========================
    // DADOS DO VEÍCULO
    // =========================

    private String modeloVeiculo;
    private String marcaVeiculo;
    private String anoVeiculo;

    private String corVeiculo;

    private String placaVeiculo;

    @Column(unique = true)
    private String chassiVeiculo;

    private String motorVeiculo;
    private String combustivelVeiculo;
    private String cambioVeiculo;

    @Column(columnDefinition = "TEXT")
    private String fotoCarroUrl;

    private String statusVeiculo;
    private Integer progressoVeiculo;

    // =========================
    // FINANCIAMENTO
    // =========================

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

    // =========================
    // SHOP / COMPRAS
    // =========================

    @Column(columnDefinition = "TEXT")
    private String acessorios;

    // =========================
    // MQTT / IoT
    // =========================

    private String vinIot;
}