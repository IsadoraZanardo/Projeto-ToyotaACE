package br.com.toyota.toyota_backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String senha;
}
