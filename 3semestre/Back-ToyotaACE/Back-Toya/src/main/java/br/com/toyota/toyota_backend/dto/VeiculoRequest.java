package br.com.toyota.toyota_backend.dto;

import lombok.Data;

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
}
