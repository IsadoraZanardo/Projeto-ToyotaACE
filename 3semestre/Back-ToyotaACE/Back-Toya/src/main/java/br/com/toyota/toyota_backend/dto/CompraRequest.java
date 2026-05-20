package br.com.toyota.toyota_backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CompraRequest {

    private Long clienteId;

    private String produto;

    private Integer quantidade;

    private BigDecimal preco;

    private BigDecimal total;

    private String metodoPagamento;
}