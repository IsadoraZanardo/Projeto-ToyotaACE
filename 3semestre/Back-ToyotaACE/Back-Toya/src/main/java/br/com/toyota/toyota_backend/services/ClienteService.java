package br.com.toyota.toyota_backend.services;

import br.com.toyota.toyota_backend.dto.FinanciamentoRequest;
import br.com.toyota.toyota_backend.dto.VeiculoRequest;
import br.com.toyota.toyota_backend.models.Cliente;
import br.com.toyota.toyota_backend.models.Veiculo;
import br.com.toyota.toyota_backend.repositories.ClienteRepository;
import br.com.toyota.toyota_backend.repositories.VeiculoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final VeiculoRepository veiculoRepository;

    public ClienteService(
            ClienteRepository clienteRepository,
            VeiculoRepository veiculoRepository
    ) {
        this.clienteRepository = clienteRepository;
        this.veiculoRepository = veiculoRepository;
    }

    // =========================
    // CLIENTE
    // =========================

    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Cliente não encontrado"
                        )
                );
    }

    public Cliente buscarPorEmail(String email) {
        return clienteRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Cliente não encontrado"
                        )
                );
    }

    public Cliente cadastrar(Cliente cliente) {

        if (cliente.getEmail() == null || cliente.getEmail().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "E-mail é obrigatório"
            );
        }

        if (cliente.getSenha() == null || cliente.getSenha().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Senha é obrigatória"
            );
        }

        if (clienteRepository.existsByEmail(cliente.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "E-mail já cadastrado"
            );
        }

        if (
                cliente.getCpf() != null &&
                        !cliente.getCpf().isBlank() &&
                        clienteRepository.existsByCpf(cliente.getCpf())
        ) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "CPF já cadastrado"
            );
        }

        return clienteRepository.save(cliente);
    }

    public Cliente login(String email, String senha) {

        Cliente cliente = buscarPorEmail(email);

        if (!cliente.getSenha().equals(senha)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "E-mail ou senha incorretos"
            );
        }

        return cliente;
    }

    public Cliente atualizar(Long id, Cliente dados) {

        Cliente cliente = buscarPorId(id);

        if (dados.getNome() != null)
            cliente.setNome(dados.getNome());

        if (dados.getEmail() != null)
            cliente.setEmail(dados.getEmail());

        if (dados.getSenha() != null)
            cliente.setSenha(dados.getSenha());

        if (dados.getCpf() != null)
            cliente.setCpf(dados.getCpf());

        if (dados.getTelefone() != null)
            cliente.setTelefone(dados.getTelefone());

        if (dados.getEndereco() != null)
            cliente.setEndereco(dados.getEndereco());

        return clienteRepository.save(cliente);
    }

    // =========================
    // VEÍCULOS
    // =========================

    public List<Veiculo> listarVeiculosCliente(Long clienteId) {

        buscarPorId(clienteId);

        return veiculoRepository.findByClienteId(clienteId);
    }

    public Veiculo buscarVeiculoPorId(Long id) {

        return veiculoRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Veículo não encontrado"
                        )
                );
    }

    public Veiculo cadastrarVeiculo(VeiculoRequest dados) {

        Cliente cliente = buscarPorId(dados.getClienteId());

        Veiculo veiculo = new Veiculo();

        preencherDadosVeiculo(veiculo, dados);

        veiculo.setCliente(cliente);

        return veiculoRepository.save(veiculo);
    }

    public Veiculo atualizarVeiculoNovo(
            Long id,
            VeiculoRequest dados
    ) {

        Veiculo veiculo = buscarVeiculoPorId(id);

        preencherDadosVeiculo(veiculo, dados);

        return veiculoRepository.save(veiculo);
    }

    public void deletarVeiculo(Long id) {

        Veiculo veiculo = buscarVeiculoPorId(id);

        veiculoRepository.delete(veiculo);
    }

    // =========================
    // LEGADO
    // =========================

    public Cliente atualizarVeiculo(Long id, VeiculoRequest dados) {

        Cliente cliente = buscarPorId(id);

        Veiculo veiculo = new Veiculo();

        preencherDadosVeiculo(veiculo, dados);

        veiculo.setCliente(cliente);

        veiculoRepository.save(veiculo);

        return cliente;
    }

    public Cliente atualizarFinanciamento(
            Long id,
            FinanciamentoRequest dados
    ) {

        Cliente cliente = buscarPorId(id);

        if (!cliente.getVeiculos().isEmpty()) {

            Veiculo veiculo =
                    cliente.getVeiculos()
                            .get(cliente.getVeiculos().size() - 1);

            if (dados.getValorTotal() != null)
                veiculo.setValorTotal(dados.getValorTotal());

            if (dados.getValorEntrada() != null)
                veiculo.setValorEntrada(dados.getValorEntrada());

            if (dados.getValorFinanciado() != null)
                veiculo.setValorFinanciado(dados.getValorFinanciado());

            if (dados.getParcelasTotais() != null)
                veiculo.setParcelasTotais(dados.getParcelasTotais());

            if (dados.getParcelasPagas() != null)
                veiculo.setParcelasPagas(dados.getParcelasPagas());

            if (dados.getParcelasRestantes() != null)
                veiculo.setParcelasRestantes(dados.getParcelasRestantes());

            if (dados.getValorParcela() != null)
                veiculo.setValorParcela(dados.getValorParcela());

            if (dados.getTaxaJuros() != null)
                veiculo.setTaxaJuros(dados.getTaxaJuros());

            if (dados.getStatusFinanciamento() != null)
                veiculo.setStatusFinanciamento(
                        dados.getStatusFinanciamento()
                );

            if (dados.getStatusGarantia() != null)
                veiculo.setStatusGarantia(
                        dados.getStatusGarantia()
                );

            if (dados.getDataProximaRevisao() != null)
                veiculo.setDataProximaRevisao(
                        dados.getDataProximaRevisao()
                );

            veiculoRepository.save(veiculo);
        }

        return cliente;
    }

    // =========================
    // AUXILIAR
    // =========================

    private void preencherDadosVeiculo(
            Veiculo veiculo,
            VeiculoRequest dados
    ) {

        if (dados.getModeloVeiculo() != null)
            veiculo.setModeloVeiculo(dados.getModeloVeiculo());

        if (dados.getMarcaVeiculo() != null)
            veiculo.setMarcaVeiculo(dados.getMarcaVeiculo());

        if (dados.getAnoVeiculo() != null)
            veiculo.setAnoVeiculo(dados.getAnoVeiculo());

        if (dados.getCorVeiculo() != null)
            veiculo.setCorVeiculo(dados.getCorVeiculo());

        if (dados.getPlacaVeiculo() != null)
            veiculo.setPlacaVeiculo(dados.getPlacaVeiculo());

        if (
                veiculo.getChassiVeiculo() == null ||
                        veiculo.getChassiVeiculo().isBlank()
        ) {

            String chassi;

            do {

                chassi =
                        "9BR" +
                                UUID.randomUUID()
                                        .toString()
                                        .replace("-", "")
                                        .substring(0, 14)
                                        .toUpperCase();

            } while (
                    veiculoRepository.existsByChassiVeiculo(chassi)
            );

            veiculo.setChassiVeiculo(chassi);
        }

        if (dados.getMotorVeiculo() != null)
            veiculo.setMotorVeiculo(dados.getMotorVeiculo());

        if (dados.getCombustivelVeiculo() != null)
            veiculo.setCombustivelVeiculo(
                    dados.getCombustivelVeiculo()
            );

        if (dados.getCambioVeiculo() != null)
            veiculo.setCambioVeiculo(dados.getCambioVeiculo());

        if (dados.getFotoCarroUrl() != null)
            veiculo.setFotoCarroUrl(dados.getFotoCarroUrl());

        if (dados.getStatusVeiculo() != null)
            veiculo.setStatusVeiculo(dados.getStatusVeiculo());

        if (dados.getProgressoVeiculo() != null)
            veiculo.setProgressoVeiculo(dados.getProgressoVeiculo());

        // FINANCIAMENTO

        if (dados.getValorTotal() != null)
            veiculo.setValorTotal(dados.getValorTotal());

        if (dados.getValorEntrada() != null)
            veiculo.setValorEntrada(dados.getValorEntrada());

        if (dados.getValorFinanciado() != null)
            veiculo.setValorFinanciado(
                    dados.getValorFinanciado()
            );

        if (dados.getParcelasTotais() != null)
            veiculo.setParcelasTotais(
                    dados.getParcelasTotais()
            );

        if (dados.getParcelasPagas() != null)
            veiculo.setParcelasPagas(
                    dados.getParcelasPagas()
            );

        if (dados.getParcelasRestantes() != null)
            veiculo.setParcelasRestantes(
                    dados.getParcelasRestantes()
            );

        if (dados.getValorParcela() != null)
            veiculo.setValorParcela(
                    dados.getValorParcela()
            );

        if (dados.getTaxaJuros() != null)
            veiculo.setTaxaJuros(dados.getTaxaJuros());

        if (dados.getStatusFinanciamento() != null)
            veiculo.setStatusFinanciamento(
                    dados.getStatusFinanciamento()
            );

        if (dados.getStatusGarantia() != null)
            veiculo.setStatusGarantia(
                    dados.getStatusGarantia()
            );

        if (dados.getDataProximaRevisao() != null)
            veiculo.setDataProximaRevisao(
                    dados.getDataProximaRevisao()
            );

        // SHOP

        if (dados.getAcessorios() != null)
            veiculo.setAcessorios(dados.getAcessorios());

        // MQTT

        if (dados.getVinIot() != null)
            veiculo.setVinIot(dados.getVinIot());
    }
}