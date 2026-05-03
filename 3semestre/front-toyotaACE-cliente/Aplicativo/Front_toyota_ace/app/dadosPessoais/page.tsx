"use client"
import { useEffect, useState } from "react"

// 1. IMPORT DO CONTEXTO: Sobe duas pastas para sair de 'dadosPessoais' e 'app', depois entra em 'src'
import { useAuth } from "../../src/contexts/AuthContext" 

// 2. IMPORT DO SERVIÇO: Ajustado para o caminho correto na pasta 'src' conforme sua estrutura
import { getAcompanhamento } from "../../src/services/api"

// 3. IMPORT DOS COMPONENTES: Estes geralmente ficam dentro da pasta 'app'
import Estrutura from "../componentes/Estrutura"

export default function DadosPessoais() {
    const { user, setUser } = useAuth();
    const [dadosBanco, setDadosBanco] = useState<any>(null);

    useEffect(() => {
        async function carregarDadosPerfil() {
            // Usa o e-mail do usuário logado ou o e-mail de teste da Isabelle
            const emailParaBusca = user?.email || "isabelle@exemplo.com"; 

            try {
                // Busca os dados no seu backend Java
                const resposta = await getAcompanhamento(emailParaBusca);
                console.log("Dados carregados com sucesso:", resposta);
                
                setDadosBanco(resposta);

                // Importante: Atualiza o contexto global para que o nome mude no Header
                if (resposta && resposta.nome) {
                    setUser(resposta);
                }
            } catch (error) {
                console.error("Erro ao buscar dados no Java:", error);
            }
        }

        carregarDadosPerfil();
    }, [user?.email, setUser]);

    return (
        /* A Estrutura recebe 'dadosBanco' e preenche Nome, CPF e Email automaticamente */
        <Estrutura dados={dadosBanco}>
            <div className="w-full text-center py-4">
                <p className="text-sm text-gray-500 italic">
                    Dados sincronizados com o sistema Toyota ACE.
                </p>
            </div>
        </Estrutura>
    );
}