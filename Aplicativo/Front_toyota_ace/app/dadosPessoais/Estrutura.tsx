import React from 'react';
import Header from "../componentes/Header";
import Rodape from "../componentes/ui/Rodape";

import { useRouter } from 'next/navigation'

// Dados de exemplo (Para tornar o componente dinâmico)
const dadosPessoais = [
  { label: 'Instituição', value: 'Banco Toyota', type: 'info' },
  { label: 'Concessionária Responsável', value: 'Toyota Ramires Sorocaba', type: 'info' },
  { label: 'Pedido', value: '1234388338', type: 'info' },
  { label: 'Carro', value: 'Toyota Corolla Altis Hybrid Premium 2024', type: 'info' },
  { label: 'Valor Total', value: 'R$ 183.000,00', type: 'info' },
  { label: 'Entrada', value: 'R$ 100.000,00', type: 'info' },
  { label: 'Parcelas Totais', value: '48', type: 'info' },
  { label: 'Parcelas Pagas', value: ' 29', type: 'info' },
  { label: 'Parcelas Atrasadas ', value: '1', type: 'info' },
  { label: 'Saldo Devedor ', value: 'R$ 83.000,00', type: 'info' },
];

const BotaoAcao = () => (
  <a
    href="https://institucional.bancotoyota.com.br/"
    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
  >
    PAGAR
  </a>
);

// O seu componente Estrutura agora é a página completa
export default function Estrutura() {
    const router = useRouter ()

    return(
        // Contêiner principal da página, com fundo cinza claro para replicar a imagem
        <div className="w-full bg-neutral-100 min-h-screen">
            <Header/>
            
            {/* Contêiner Principal do Conteúdo: Centraliza o status do carro/dados */}
            <main className="max-w-4xl mx-auto space-y-6 px-4 py-8"> 

                {/* ======================================================= */}
                {/* SEÇÃO 1: STATUS DO CARRO */}
                {/* ======================================================= */}
                <div className="bg-neutral-100 p-8 pt-10">
                    
                    {/* Título Principal */}
                    <h1 className="text-center text-3xl md:text-4xl font-semibold text-red-600 mb-8">
                        Seu carro já está sendo preparado!
                    </h1>
                    
                    {/* Imagem do Carro */}
                    <div className="text-center">
                        <img 
                            src="https://via.placeholder.com/600x300/e5e7eb/000000?text=Imagem+do+Carro+Aqui" 
                            alt="Carro Escolhido" 
                            className="max-w-xl mx-auto h-auto object-contain"
                        />
                    </div>
                    
                    {/* Informações do Carro */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600 mb-1">
                            Carro escolhido:
                        </p>
                        <p className="text-base font-medium text-gray-800">
                            Toyota Corolla Altis Hybrid Premium 2024
                        </p>
                    </div>
                </div>

                {/* ======================================================= */}
                {/* SEÇÃO 2: DADOS PESSOAIS E DOCUMENTOS */}
                {/* ======================================================= */}
                <div className="bg-neutral-100 p-8"> 
                    
                    {/* Título da Seção */}
                    <h3 className="text-xl md:text-2xl font-semibold mb-6">
                        <span className="text-red-600 mr-2 flex text-center">Informações do Veículo: </span>
                    </h3>

                    {/* GRID LADO A LADO (lista + card do botão) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* LISTA DE DADOS (lado esquerdo) */}
                        <ul className="space-y-2 text-gray-800 text-base">
                            {dadosPessoais.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    {item.type === 'info' ? (
                                        <p>
                                            <span className="font-bold">{item.label}:</span>{' '}
                                            {item.value}
                                        </p>
                                    ) : (
                                        <p className="flex items-center">
                                            <span className="text-green-600 mr-2 text-lg">✅</span> 
                                            <span className="font-bold">{item.label}</span>{' '}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>


                        <div className="bg-gray-200 rounded-xl p-2 flex flex-col justify-center items-center">
                            <h4 className="text-lg mb-5 text-center">
                            Acesse a Ficha Técnica para descobrir em qual fase da montagem está seu veículo!
                            </h4>

                            <a
                                onClick={()=>{router.push('http://localhost:3000/fichaTecnica')}}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                            >
                                FICHA TÉCNICA
                            </a>
                        </div>

                    </div>

                    {/* BOTÃO QUE JÁ EXISTIA (embaixo) */}
                    <br />
                    <br></br>
                    <div className="text-xl md:text-2xl font-semibold mb-6 flex justify-center">
                        <BotaoAcao />
                    </div>

                </div>
                {/* FIM DO CONTEÚDO DA PÁGINA */}

            </main>
            
            <Rodape/>
        </div>
    )
}
