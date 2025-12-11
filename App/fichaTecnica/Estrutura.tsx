import React from 'react';
import Header from "../componentes/Header";
import Rodape from "../componentes/ui/Rodape";

import { useRouter } from 'next/navigation'

// Dados atualizados com conteúdo dentro dos quadrados
const dadosPessoais = [
  { label: '1. Prensagem', conteudo: 'Chapas metálicas são prensadas em grandes moldes usando prensas.' },
  { label: '2. Funilaria', conteudo: 'Onde a carroceria e peças mecânicas são montadas e soldadas' },
  { label: '3. Pintura', conteudo: 'Processo de impermeabilização, proteção e pintura do veículo.' },
  { label: '4. Montagem', conteudo: 'Instalação dos componentes internos e externos.' }
];

// Botão PAGAR
const BotaoAcao = () => (
  <a
    href="https://institucional.bancotoyota.com.br/"
    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
  >
    PAGAR
  </a>
);

export default function Estrutura() {
    const router = useRouter()

    return(
        <div className="w-full bg-neutral-100 min-h-screen">
            <Header/>            
            <main className="max-w-4xl mx-auto space-y-6 px-4 py-8"> 


                <div className="bg-neutral-100 p-8 pt-10">
                    
                    <h1 className="text-center text-3xl md:text-4xl font-semibold text-red-600 mb-8">
                        Ficha Técnica Detalhada
                    </h1>
                    
                    <div className="text-center">
                        <img 
                            src="https://via.placeholder.com/600x300/e5e7eb/000000?text=Imagem+do+Carro+Aqui" 
                            alt="" 
                            className="max-w-xl mx-auto h-auto object-contain"
                        />
                    </div>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600 mb-1">
                            Carro escolhido:
                        </p>
                        <p className="text-base font-medium text-gray-800">
                            Toyota Corolla Altis Hybrid Premium 2024
                        </p>
                    </div>
                </div>

                <div className="bg-neutral-100 p-8"> 
                    
                    <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
                        <span className="text-red-600 mr-2 text-center">Seu caminho para o carro novo!</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                        {dadosPessoais.map((item, index) => (
                            <div key={index} className="flex flex-col items-center space-y-3">

                                <span className="font-bold text-gray-800 text-base text-center">
                                    {item.label}
                                </span>

                                <div className="bg-gray-200 w-full h-24 rounded-xl flex items-center justify-center text-center px-3">
                                    <span className="text-sm text-gray-700 break-words">
                                        {item.conteudo}
                                    </span>
                                </div>
                                
                            </div>
                        ))}

                    </div>

                </div>

            </main>
            
            <Rodape/>
        </div>
    )
}
