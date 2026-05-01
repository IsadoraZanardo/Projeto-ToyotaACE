"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

// Importe o seu contexto de autenticação (ajuste se a pasta contexts estiver fora da app)
// Se 'contexts' estiver dentro de 'app', use:
import { useAuth } from "../contexts/AuthContext" 

// Caminho para o serviço de API
import { getAcompanhamento } from "../services/api"

// Caminhos baseados na imagem da sua estrutura de pastas
import Estrutura from "../componentes/Estrutura"
import MeuCard from "../componentes/ui/MeuCard"

// Caminho para a imagem do Yaris
import Yaris from "../assets/image/image/yaris.png"

export default function Financiamento() {
    const { user } = useAuth();
    const [dadosBanco, setDadosBanco] = useState<any>(null);

    useEffect(() => {
        async function buscarDados() {
            if (user?.email) {
                const resposta = await getAcompanhamento(user.email);
                setDadosBanco(resposta);
            }
        }
        buscarDados();
    }, [user?.email]);

    return (
        <Estrutura dados={dadosBanco}>
            <MeuCard tamanho="xl">
                <div className="flex flex-col items-center">
                    <Image
                        src={Yaris}
                        width={300} // Aumentei para ficar melhor na tela
                        height={200}
                        alt="yaris"
                    />
                    <p className="mt-2 font-bold text-gray-700">
                        {dadosBanco?.modeloVeiculo || "Toyota Yaris"}
                    </p>
                </div>
            </MeuCard>
        </Estrutura>
    );
}