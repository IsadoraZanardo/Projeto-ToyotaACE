package br.com.toyota.toyota_backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FinanciamentoRequest {
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
