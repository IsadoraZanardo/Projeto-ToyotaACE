"use client"

import Image from "next/image"
import Header from "../componentes/Header";
import Rodape from "../componentes/ui/Rodape";
import { useRouter } from 'next/navigation'

import Yaris from "@/app/assets/image/image/Toyota_Corolla_Altis_Hybrid_Premium_2024__preço__ficha_técnica__equipamentos_e_mais-removebg-preview.png" 

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
        target="_blank"
        rel="noopener noreferrer" 
    >
        PAGAR
    </a>
);

export default function Estrutura() {
    const router = useRouter()

    const handleFichaTecnica = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault(); 
        router.push('/fichaTecnica');
    };

    return (
        <div className="w-full bg-neutral-100 min-h-screen">
            <Header />

            <main className="max-w-4xl mx-auto space-y-6 px-4 py-8">

                <div className="bg-neutral-100 p-8 pt-10">

                    <h1 className="text-center text-3xl md:text-4xl font-semibold text-red-600 mb-8">
                        Seu carro já está sendo preparado!
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

                    <h3 className="text-xl md:text-2xl font-semibold mb-6">
                        <span className="text-red-600 mr-2">Informações do Financiamento: </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <ul className="space-y-2 text-gray-800 text-base">
                            {dadosPessoais.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <p>
                                        <span className="font-bold">{item.label}:</span>{' '}
                                        {item.value}
                                    </p>
                                </li>
                            ))}
                        </ul>


                        <div className="bg-gray-200 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                            <h4 className="text-lg mb-5">
                                Acesse a Ficha Técnica para descobrir em qual fase da montagem está seu veículo!
                            </h4>

                            <a
                                onClick={handleFichaTecnica}
                                href="/fichaTecnica"
                                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition cursor-pointer"
                            >
                                FICHA TÉCNICA
                            </a>
                        </div>

                    </div>

                    <div className="mt-8 pt-4 flex justify-center">
                        <BotaoAcao />
                    </div>

                </div>
            </main>

            <Rodape />
        </div>
    )
}