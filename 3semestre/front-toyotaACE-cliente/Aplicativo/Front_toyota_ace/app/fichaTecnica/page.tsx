"use client"
"use client"

import { useEffect, useState } from "react"

import Estrutura from "./Estrutura"
import MeuCard from "../componentes/ui/MeuCard"

export default function DadosPessoais() {

    const [etapas, setEtapas] = useState<string[]>([])

    useEffect(() => {

        fetch("https://le42wmnr99.execute-api.us-east-1.amazonaws.com/prod/api/iot/status/ABC123")
            .then((res) => res.json())
            .then((data) => {
                setEtapas(data)
            })
            .catch((error) => {
                console.error("Erro ao buscar dados IoT:", error)
            })

    }, [])

    return (
        <Estrutura>

            <MeuCard tamanho="xl">

                <div style={{ marginTop: "20px" }}>

                    <h2>Timeline de Fabricação</h2>

                    {etapas.length === 0 ? (

                        <p>Nenhuma etapa encontrada.</p>

                    ) : (

                        etapas.map((etapa, index) => (
                            <p key={index}>
                                ✅ {etapa}
                            </p>
                        ))

                    )}

                </div>

            </MeuCard>

        </Estrutura>
    )
}