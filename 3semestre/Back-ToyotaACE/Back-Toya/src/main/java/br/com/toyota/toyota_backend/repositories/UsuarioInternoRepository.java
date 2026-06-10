package br.com.toyota.toyota_backend.repositories;

import br.com.toyota.toyota_backend.models.UsuarioInterno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioInternoRepository extends JpaRepository<UsuarioInterno, Long> {

    Optional<UsuarioInterno> findByEmail(String email);

    boolean existsByEmail(String email);
}