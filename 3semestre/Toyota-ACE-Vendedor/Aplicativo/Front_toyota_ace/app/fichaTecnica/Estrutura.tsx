"use client"

import React from 'react';
import Header from "../componentes/ui/Header";
import Rodape from "../componentes/ui/Rodape";
import Image from "next/image"
import { useRouter } from 'next/navigation'

import Yaris from "@/app/assets/image/image/Toyota_Corolla_Altis_Hybrid_Premium_2024__preço__ficha_técnica__equipamentos_e_mais-removebg-preview.png" 

const dadosPessoais = [
    { label: '1. Prensagem', conteudo: 'Chapas metálicas são prensadas em grandes moldes usando prensas.' },
    { label: '2. Funilaria', conteudo: 'Onde a carroceria e peças mecânicas são montadas e soldadas' },
    { label: '3. Pintura', conteudo: 'Processo de impermeabilização, proteção e pintura do veículo.' },
    { label: '4. Montagem', conteudo: 'Instalação dos componentes internos e externos.' }
];

const BotaoAcao = () => (
    <a
        href="https://institucional.bancotoyota.com.br/"
        className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
        target="_blank"
        rel="noopener noreferrer" 
    >
        PAGAR FINANCIAMENTO
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

                        <div className="relative mx-auto max-w-xl h-64 md:h-80">
                            <Image
                                src={Yaris}
                                fill
                                alt="Carro Escolhido"
                                className="object-contain" 
                                sizes="(max-width: 748px) 90vw, 50vw" 
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
                </div>

                <div className="bg-neutral-100 p-8"> 
                    
                    <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
                        <span className="text-red-600 mr-2">Seu caminho para o carro novo!</span>
                    </h3>
                    

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                        {dadosPessoais.map((item, index) => (
                            <div key={index} className="flex flex-col items-center space-y-3">

                                <span className="font-bold text-gray-800 text-base text-center">
                                    {item.label}
                                </span>

                                <div className="bg-gray-200 w-full h-24 rounded-xl flex items-center justify-center text-center px-3 shadow-md">
                                    <span className="text-sm text-gray-700 break-words">
                                        {item.conteudo}
                                    </span>
                                </div>
                                
                            </div>
                        ))}

                    </div>
                    
                    <div className="flex justify-center space-x-4 mt-12 pt-6 border-t border-gray-300">
                        
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                        >
                            VOLTAR
                        </button>
                        
                        <BotaoAcao />
                    </div>

                </div>

            </main>
            
            <Rodape/>
        </div>
    )
}