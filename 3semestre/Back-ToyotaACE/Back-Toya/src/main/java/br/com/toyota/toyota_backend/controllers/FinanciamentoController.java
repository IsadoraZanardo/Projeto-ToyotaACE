package br.com.toyota.toyota_backend.controllers;

import br.com.toyota.toyota_backend.dto.FinanciamentoRequest;
import br.com.toyota.toyota_backend.models.Cliente;
import br.com.toyota.toyota_backend.services.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/financiamento")
@CrossOrigin(origins = "*")
public class FinanciamentoController {
    private final ClienteService clienteService;

    public FinanciamentoController(ClienteService clienteService) {
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
    public ResponseEntity<Cliente> atualizar(@PathVariable Long clienteId, @RequestBody FinanciamentoRequest dados) {
        return ResponseEntity.ok(clienteService.atualizarFinanciamento(clienteId, dados));
    }
}
