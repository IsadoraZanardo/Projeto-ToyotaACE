"use client"

import Header from "../componentes/Header"
import HeroSection from "../componentes/HeroSection"
import Backdrop from "../componentes/Backdrop"
import Card from "../componentes/ui/Card"
import Login from "../login/page"
import Rodape from "../componentes/ui/Rodape"

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const botaoClasse =
    "w-full px-6 py-4 bg-red-200 text-white rounded-lg font-semibold hover:bg-red-700 transition text-center"

  return (
    <div className="">
      <Header />
      <Backdrop />

      <div className="h-screen flex items-center p-8">
        <Card />
      </div>

      {/* Seção principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* GRID 3 colunas ocupando toda largura */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">

          <a
            onClick={() => router.push("http://localhost:3000/dadosPessoais")}
            className={botaoClasse}
          >
            Financiamento
          </a>

          <a
            onClick={() => router.push("http://localhost:3000/financiamento")}
            className={botaoClasse}
          >
            Dados Pessoais
          </a>

          <a
            onClick={() => router.push("http://localhost:3000/fichaTecnica")}
            className={botaoClasse}
          >
            Agendar Retirada
          </a>

        </div>

      </div>

      <Rodape />
    </div>
  )
}
