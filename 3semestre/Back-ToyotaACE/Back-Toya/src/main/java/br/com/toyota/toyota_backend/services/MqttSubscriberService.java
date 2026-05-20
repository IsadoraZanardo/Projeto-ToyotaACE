package br.com.toyota.toyota_backend.services;

import br.com.toyota.toyota_backend.models.Veiculo;
import br.com.toyota.toyota_backend.repositories.VeiculoRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MqttSubscriberService {

    @Value("${mqtt.broker}")
    private String broker;

    @Value("${mqtt.topic}")
    private String topic;

    private final VeiculoRepository veiculoRepository;

    public MqttSubscriberService(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    @PostConstruct
    public void init() {
        try {
            MqttClient client = new MqttClient(
                    broker,
                    "toyota-subscriber-" + System.currentTimeMillis()
            );

            MqttConnectOptions options = new MqttConnectOptions();
            options.setAutomaticReconnect(true);
            options.setCleanSession(true);

            client.connect(options);

            client.subscribe(topic, (t, msg) -> {
                try {
                    String payload = new String(msg.getPayload());

                    System.out.println("MQTT RECEBIDO:");
                    System.out.println(payload);

                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode json = mapper.readTree(payload);

                    String chassi = json.get("chassi").asText();
                    String etapa = json.get("etapa").asText();
                    int progresso = json.get("progresso").asInt();

                    Veiculo veiculo = veiculoRepository
                            .findByChassiVeiculo(chassi)
                            .orElse(null);

                    if (veiculo != null) {
                        veiculo.setStatusVeiculo(etapa);
                        veiculo.setProgressoVeiculo(progresso);

                        veiculoRepository.save(veiculo);

                        System.out.println("VEÍCULO ATUALIZADO VIA MQTT: " + chassi);
                    } else {
                        System.out.println("VEÍCULO NÃO ENCONTRADO PARA CHASSI: " + chassi);
                    }
                } catch (Exception e) {
                    System.out.println("ERRO AO PROCESSAR MENSAGEM MQTT:");
                    e.printStackTrace();
                }
            });

            System.out.println("MQTT SUBSCRIBER CONECTADO NO TÓPICO: " + topic);
        } catch (Exception e) {
            System.out.println("ERRO AO CONECTAR SUBSCRIBER MQTT:");
            e.printStackTrace();
        }
    }
}