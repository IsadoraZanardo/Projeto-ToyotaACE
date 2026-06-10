package br.com.toyota.toyota_backend.config;

import br.com.toyota.toyota_backend.models.PerfilUsuario;
import br.com.toyota.toyota_backend.models.UsuarioInterno;
import br.com.toyota.toyota_backend.repositories.UsuarioInternoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class UsuarioInternoSeedConfig {

    @Bean
    CommandLineRunner criarUsuariosInternosPadrao(UsuarioInternoRepository repository) {
        return args -> {
            criarUsuarioSeNaoExistir(
                    repository,
                    "Administrador Toyota",
                    "adm@toyota.com",
                    "123456",
                    PerfilUsuario.ADMIN
            );

            criarUsuarioSeNaoExistir(
                    repository,
                    "Vendedor Toyota",
                    "vendedor@toyota.com",
                    "123456",
                    PerfilUsuario.VENDEDOR
            );
        };
    }

    private void criarUsuarioSeNaoExistir(
            UsuarioInternoRepository repository,
            String nome,
            String email,
            String senha,
            PerfilUsuario perfil
    ) {
        String emailNormalizado = email.trim().toLowerCase();

        if (repository.existsByEmail(emailNormalizado)) {
            return;
        }

        UsuarioInterno usuario = new UsuarioInterno();
        usuario.setNome(nome);
        usuario.setEmail(emailNormalizado);
        usuario.setSenha(senha);
        usuario.setPerfil(perfil);
        usuario.setAtivo(true);
        usuario.setCreatedAt(LocalDate.now());

        repository.save(usuario);
    }
}