"use client"

import Header from "../componentes/Header"
// Importações não utilizadas removidas: HeroSection, Login
import Card from "../componentes/ui/Card"
import Rodape from "../componentes/ui/Rodape"

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  // 1. Variável de classe definida dentro do componente (Ajustei a cor do botão para ter contraste com o texto branco)
  const botaoClasse =
    "w-full px-6 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-center cursor-pointer shadow-md"
    
  return (
    // Container principal: Usa flex-col para empilhar Header, Conteúdo e Rodapé
    <div className="min-h-screen flex flex-col"> 
      
      <Header />
      
      {/* 2. CONTEÚDO PRINCIPAL (Agora no topo da seção main) */}
      <main className="flex-grow flex flex-col items-center p-8">
        
        {/* SEÇÃO PRINCIPAL (BOTÕES) - MOVIDA PARA CIMA */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">

          {/* GRID 3 colunas ocupando toda largura */}
          {/* Adicionei 'max-w-3xl' e 'mx-auto' para centralizar a grade de botões */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto">

            <a
              onClick={() => router.push("/dadosPessoais")}
              className={botaoClasse}
            >
              Dados Pessoais
            </a>

            <a
              onClick={() => router.push("/financiamento")}
              className={botaoClasse}
            >
              Financiamento
            </a>

            <a
              onClick={() => router.push("/fichaTecnica")}
              className={botaoClasse}
            >
              Ficha Técnica
            </a>

          </div>

        </div>
        <br />
        <br />

        {/* 3. SEÇÃO DO CARD - MOVIDA PARA BAIXO */}
        <div className="flex items-center justify-center w-full p-4">
          <Card />
        </div>

      </main>

      <Rodape />
    </div>
  )
}