package br.com.toyota.toyota_backend.services;

import br.com.toyota.toyota_backend.models.Veiculo;
import br.com.toyota.toyota_backend.repositories.VeiculoRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.springframework.stereotype.Service;

@Service
public class MqttConsumerService {

    private final VeiculoRepository veiculoRepository;

    public MqttConsumerService(
            VeiculoRepository veiculoRepository
    ) {
        this.veiculoRepository = veiculoRepository;
    }

    @PostConstruct
    public void start() {

        try {

            MqttClient client = new MqttClient(
                    "tcp://localhost:1883",
                    MqttClient.generateClientId()
            );

            client.connect();

            System.out.println("CONECTADO MQTT");

            client.subscribe("toyota/status", (topic, msg) -> {

                try {

                    String payload = new String(msg.getPayload());

                    System.out.println("MQTT RECEBIDO: " + payload);

                    ObjectMapper mapper = new ObjectMapper();

                    JsonNode json = mapper.readTree(payload);

                    String chassi = json.get("chassi").asText();

                    Integer progresso = json.get("progresso").asInt();

                    String etapa = json.get("etapa").asText();

                    Veiculo veiculo = veiculoRepository
                            .findByChassiVeiculo(chassi)
                            .orElse(null);

                    if (veiculo == null) {
                        System.out.println("VEICULO NÃO ENCONTRADO");
                        return;
                    }

                    veiculo.setProgressoVeiculo(progresso);
                    veiculo.setStatusVeiculo(etapa);

                    veiculoRepository.save(veiculo);

                    System.out.println("VEÍCULO ATUALIZADO");

                } catch (Exception e) {
                    e.printStackTrace();
                }

            });

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}