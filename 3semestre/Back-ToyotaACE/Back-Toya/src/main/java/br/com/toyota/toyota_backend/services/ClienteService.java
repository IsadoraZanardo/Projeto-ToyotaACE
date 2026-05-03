package br.com.toyota.toyota_backend.services;

import br.com.toyota.toyota_backend.dto.FinanciamentoRequest;
import br.com.toyota.toyota_backend.dto.VeiculoRequest;
import br.com.toyota.toyota_backend.models.Cliente;
import br.com.toyota.toyota_backend.repositories.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    public Cliente buscarPorEmail(String email) {
        return clienteRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    public Cliente cadastrar(Cliente cliente) {
        if (cliente.getEmail() == null || cliente.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail é obrigatório");
        }
        if (cliente.getSenha() == null || cliente.getSenha().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha é obrigatória");
        }
        if (clienteRepository.existsByEmail(cliente.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado");
        }
        if (cliente.getCpf() != null && !cliente.getCpf().isBlank() && clienteRepository.existsByCpf(cliente.getCpf())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado");
        }
        preencherPadroes(cliente);
        return clienteRepository.save(cliente);
    }

    public Cliente login(String email, String senha) {
        Cliente cliente = buscarPorEmail(email);
        if (!cliente.getSenha().equals(senha)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha incorretos");
        }
        return cliente;
    }

    public Cliente atualizar(Long id, Cliente dados) {
        Cliente cliente = buscarPorId(id);
        if (dados.getNome() != null) cliente.setNome(dados.getNome());
        if (dados.getEmail() != null) cliente.setEmail(dados.getEmail());
        if (dados.getSenha() != null) cliente.setSenha(dados.getSenha());
        if (dados.getCpf() != null) cliente.setCpf(dados.getCpf());
        if (dados.getTelefone() != null) cliente.setTelefone(dados.getTelefone());
        if (dados.getEndereco() != null) cliente.setEndereco(dados.getEndereco());
        return clienteRepository.save(cliente);
    }

    public Cliente atualizarVeiculo(Long id, VeiculoRequest dados) {
        Cliente cliente = buscarPorId(id);
        if (dados.getModeloVeiculo() != null) cliente.setModeloVeiculo(dados.getModeloVeiculo());
        if (dados.getMarcaVeiculo() != null) cliente.setMarcaVeiculo(dados.getMarcaVeiculo());
        if (dados.getAnoVeiculo() != null) cliente.setAnoVeiculo(dados.getAnoVeiculo());
        if (dados.getCorVeiculo() != null) cliente.setCorVeiculo(dados.getCorVeiculo());
        if (dados.getPlacaVeiculo() != null) cliente.setPlacaVeiculo(dados.getPlacaVeiculo());
        if (dados.getChassiVeiculo() != null) cliente.setChassiVeiculo(dados.getChassiVeiculo());
        if (dados.getMotorVeiculo() != null) cliente.setMotorVeiculo(dados.getMotorVeiculo());
        if (dados.getCombustivelVeiculo() != null) cliente.setCombustivelVeiculo(dados.getCombustivelVeiculo());
        if (dados.getCambioVeiculo() != null) cliente.setCambioVeiculo(dados.getCambioVeiculo());
        if (dados.getFotoCarroUrl() != null) cliente.setFotoCarroUrl(dados.getFotoCarroUrl());
        if (dados.getStatusVeiculo() != null) cliente.setStatusVeiculo(dados.getStatusVeiculo());
        if (dados.getProgressoVeiculo() != null) cliente.setProgressoVeiculo(dados.getProgressoVeiculo());
        return clienteRepository.save(cliente);
    }

    public Cliente atualizarFinanciamento(Long id, FinanciamentoRequest dados) {
        Cliente cliente = buscarPorId(id);
        if (dados.getValorTotal() != null) cliente.setValorTotal(dados.getValorTotal());
        if (dados.getValorEntrada() != null) cliente.setValorEntrada(dados.getValorEntrada());
        if (dados.getValorFinanciado() != null) cliente.setValorFinanciado(dados.getValorFinanciado());
        if (dados.getParcelasTotais() != null) cliente.setParcelasTotais(dados.getParcelasTotais());
        if (dados.getParcelasPagas() != null) cliente.setParcelasPagas(dados.getParcelasPagas());
        if (dados.getParcelasRestantes() != null) cliente.setParcelasRestantes(dados.getParcelasRestantes());
        if (dados.getValorParcela() != null) cliente.setValorParcela(dados.getValorParcela());
        if (dados.getTaxaJuros() != null) cliente.setTaxaJuros(dados.getTaxaJuros());
        if (dados.getStatusFinanciamento() != null) cliente.setStatusFinanciamento(dados.getStatusFinanciamento());
        if (dados.getStatusGarantia() != null) cliente.setStatusGarantia(dados.getStatusGarantia());
        if (dados.getDataProximaRevisao() != null) cliente.setDataProximaRevisao(dados.getDataProximaRevisao());
        return clienteRepository.save(cliente);
    }

    private void preencherPadroes(Cliente cliente) {
        if (cliente.getModeloVeiculo() == null) cliente.setModeloVeiculo("Toyota Corolla Cross XRE");
        if (cliente.getMarcaVeiculo() == null) cliente.setMarcaVeiculo("Toyota");
        if (cliente.getAnoVeiculo() == null) cliente.setAnoVeiculo("2025");
        if (cliente.getStatusVeiculo() == null) cliente.setStatusVeiculo("PINTURA");
        if (cliente.getProgressoVeiculo() == null) cliente.setProgressoVeiculo(45);
        if (cliente.getStatusGarantia() == null) cliente.setStatusGarantia("ATIVA");
        if (cliente.getStatusFinanciamento() == null) cliente.setStatusFinanciamento("EM DIA");
    }
}
