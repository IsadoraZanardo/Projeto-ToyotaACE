package br.com.toyota.toyota_backend.services;

import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MqttPublisherService {

    @Value("${mqtt.broker}")
    private String broker;

    @Value("${mqtt.client.id}")
    private String clientId;

    @Value("${mqtt.topic}")
    private String topic;

    public void publish(String payload) {
        try {
            MqttClient client = new MqttClient(broker, clientId + "-pub-" + System.currentTimeMillis());

            MqttConnectOptions options = new MqttConnectOptions();
            options.setAutomaticReconnect(true);
            options.setCleanSession(true);

            client.connect(options);

            MqttMessage message = new MqttMessage(payload.getBytes());
            message.setQos(1);

            client.publish(topic, message);

            client.disconnect();
            client.close();

            System.out.println("MQTT ENVIADO: " + payload);
        } catch (Exception e) {
            System.out.println("ERRO AO PUBLICAR MQTT:");
            e.printStackTrace();
        }
    }
}