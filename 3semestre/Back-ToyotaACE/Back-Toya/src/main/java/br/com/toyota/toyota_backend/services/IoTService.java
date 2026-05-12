package br.com.toyota.toyota_backend.services;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.QueryApi;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IoTService {

    @Autowired
    private InfluxDBClient influxDBClient;

    public List<String> buscarEtapas(final String vin) {

        final String flux = """
            from(bucket: "toyota_ace")
              |> range(start: -30d)
              |> filter(fn: (r) => r["vin"] == "%s")
            """.formatted(vin);

        QueryApi queryApi = influxDBClient.getQueryApi();

        List<FluxTable> tables = queryApi.query(flux);

        List<String> etapas = new ArrayList<>();

        for (FluxTable table : tables) {

            for (FluxRecord record : table.getRecords()) {

                Object etapa = record.getValueByKey("etapa");

                if (etapa != null) {
                    etapas.add(etapa.toString());
                }
            }
        }

        return etapas;
    }
}