package br.com.toyota.toyota_backend.controllers;

import br.com.toyota.toyota_backend.services.IoTService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/iot")
public class IoTController {

    @Autowired
    private IoTService ioTService;

    @GetMapping("/status/{vin}")
    public List<String> buscarStatus(
            @PathVariable String vin
    ) {

        return List.of(
                "Pedido Realizado",
                "Linha de Produção",
                "Inspeção",
                "Cegonha",
                "Concessionária"
        );
    }
}