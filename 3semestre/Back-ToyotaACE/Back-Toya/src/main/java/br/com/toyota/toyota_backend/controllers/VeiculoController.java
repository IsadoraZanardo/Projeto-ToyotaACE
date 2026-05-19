package br.com.toyota.toyota_backend.controllers;

import br.com.toyota.toyota_backend.dto.VeiculoRequest;
import br.com.toyota.toyota_backend.models.Veiculo;
import br.com.toyota.toyota_backend.services.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
@CrossOrigin(origins = "*")
public class VeiculoController {

    private final ClienteService clienteService;

    public VeiculoController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // =========================
    // LISTAR VEÍCULOS CLIENTE
    // =========================

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Veiculo>> listarPorCliente(
            @PathVariable Long clienteId
    ) {
        return ResponseEntity.ok(
                clienteService.listarVeiculosCliente(clienteId)
        );
    }

    // =========================
    // CADASTRAR VEÍCULO
    // =========================

    @PostMapping
    public ResponseEntity<Veiculo> cadastrar(
            @RequestBody VeiculoRequest dados
    ) {
        return ResponseEntity.ok(
                clienteService.cadastrarVeiculo(dados)
        );
    }

    // =========================
    // BUSCAR VEÍCULO
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                clienteService.buscarVeiculoPorId(id)
        );
    }

    // =========================
    // ATUALIZAR VEÍCULO
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(
            @PathVariable Long id,
            @RequestBody VeiculoRequest dados
    ) {
        return ResponseEntity.ok(
                clienteService.atualizarVeiculoNovo(id, dados)
        );
    }

    // =========================
    // DELETAR
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(
            @PathVariable Long id
    ) {
        clienteService.deletarVeiculo(id);

        return ResponseEntity.noContent().build();
    }
}