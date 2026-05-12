package br.com.toyota.toyota_backend.config;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InfluxConfig {

    @Value("${influx.url}")
    private String url;

    @Value("${influx.token}")
    private String token;

    @Bean
    public InfluxDBClient influxDBClient() {

        if (url == null || token == null) {
            throw new IllegalStateException("Configurações do InfluxDB não foram encontradas.");
        }

        return InfluxDBClientFactory.create(
                url,
                token.toCharArray()
        );
    }
}