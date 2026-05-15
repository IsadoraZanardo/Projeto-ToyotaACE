package br.com.toyota.toyota_backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class VeiculoRequest {
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