package br.com.toyota.toyota_backend.controllers;

import br.com.toyota.toyota_backend.dto.VeiculoRequest;
import br.com.toyota.toyota_backend.models.Cliente;
import br.com.toyota.toyota_backend.services.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/veiculo")
@CrossOrigin(origins = "*")
public class VeiculoController {
    private final ClienteService clienteService;

    public VeiculoController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/{clienteId}")
    public ResponseEntity<Cliente> buscarPorClienteId(@PathVariable Long clienteId) {
        return ResponseEntity.ok(clienteService.buscarPorId(clienteId));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Cliente> buscarPorEmail(@PathVariable String email) {
        return ResponseEntity.ok(clienteService.buscarPorEmail(email));
    }

    @PutMapping("/{clienteId}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long clienteId, @RequestBody VeiculoRequest dados) {
        return ResponseEntity.ok(clienteService.atualizarVeiculo(clienteId, dados));
    }
}
