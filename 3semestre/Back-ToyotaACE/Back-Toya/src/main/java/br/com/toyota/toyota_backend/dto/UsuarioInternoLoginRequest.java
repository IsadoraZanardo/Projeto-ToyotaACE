package br.com.toyota.toyota_backend.dto;

import lombok.Data;

@Data
public class UsuarioInternoLoginRequest {

    private String email;

    private String senha;
}