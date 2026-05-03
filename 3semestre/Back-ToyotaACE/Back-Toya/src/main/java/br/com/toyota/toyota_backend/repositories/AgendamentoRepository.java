package br.com.toyota.toyota_backend.repositories;

import br.com.toyota.toyota_backend.models.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByClienteIdOrderByDataAscHorarioAsc(Long clienteId);
}
