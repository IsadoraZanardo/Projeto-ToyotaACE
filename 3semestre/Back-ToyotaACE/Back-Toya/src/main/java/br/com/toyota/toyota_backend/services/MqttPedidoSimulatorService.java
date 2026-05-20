package br.com.toyota.toyota_backend.services;

import br.com.toyota.toyota_backend.models.Veiculo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class MqttPedidoSimulatorService {

    private final MqttPublisherService publisher;

    public MqttPedidoSimulatorService(MqttPublisherService publisher) {
        this.publisher = publisher;
    }

    public void iniciarFluxo(Veiculo veiculo) {
        new Thread(() -> {
            try {
                String[] etapas = {
                        "PEDIDO REALIZADO",
                        "LINHA DE PRODUÇÃO",
                        "INSPEÇÃO",
                        "CEGONHA",
                        "CONCESSIONÁRIA",
                        "PRONTO PARA RETIRADA"
                };

                int[] progresso = {
                        16,
                        33,
                        50,
                        66,
                        83,
                        100
                };

                ObjectMapper mapper = new ObjectMapper();

                for (int i = 0; i < etapas.length; i++) {
                    String payload = mapper.writeValueAsString(
                            Map.of(
                                    "chassi", veiculo.getChassiVeiculo(),
                                    "etapa", etapas[i],
                                    "progresso", progresso[i]
                            )
                    );

                    publisher.publish(payload);

                    Thread.sleep(5000);
                }
            } catch (Exception e) {
                System.out.println("ERRO NO SIMULADOR MQTT:");
                e.printStackTrace();
            }
        }).start();
    }
}