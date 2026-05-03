package br.com.toyota.toyota_backend.controllers;

import br.com.toyota.toyota_backend.dto.AgendamentoRequest;
import br.com.toyota.toyota_backend.models.Agendamento;
import br.com.toyota.toyota_backend.models.Cliente;
import br.com.toyota.toyota_backend.repositories.AgendamentoRepository;
import br.com.toyota.toyota_backend.services.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentoController {
    private final AgendamentoRepository agendamentoRepository;
    private final ClienteService clienteService;

    public AgendamentoController(AgendamentoRepository agendamentoRepository, ClienteService clienteService) {
        this.agendamentoRepository = agendamentoRepository;
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<Agendamento> agendar(@RequestBody AgendamentoRequest request) {
        Cliente cliente = request.getClienteId() != null
                ? clienteService.buscarPorId(request.getClienteId())
                : clienteService.buscarPorEmail(request.getEmail());

        Agendamento agendamento = new Agendamento();
        agendamento.setCliente(cliente);
        agendamento.setData(request.getData());
        agendamento.setHorario(request.getHorario());
        agendamento.setTipoServico(request.getTipoServico());
        agendamento.setObservacao(request.getObservacao());
        agendamento.setStatus("AGENDADO");

        return ResponseEntity.ok(agendamentoRepository.save(agendamento));
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Agendamento>> listarPorCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(agendamentoRepository.findByClienteIdOrderByDataAscHorarioAsc(clienteId));
    }
}
