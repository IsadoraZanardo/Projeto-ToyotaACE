"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
// ATUALIZE ESTE CAMINHO com o caminho exato da sua imagem do Corolla
import Corolla from '@/app/assets/image/image/Toyota_Corolla_Altis_Hybrid_Premium_2024__preço__ficha_técnica__equipamentos_e_mais-removebg-preview.png';

// --- DADOS FIXOS DO CARD ---
const FIXED_ITEM_DATA = {
    imageUrl: Corolla,
    model: 'Toyota Corolla Altis Hybrid Premium 2024',
};

// --- COMPONENTE AUXILIAR PARA A IMAGEM ---
const MeuCard = ({ src, alt, className = '' }: any) => {
    return (
        <div className={`relative ${className}`}>
            <Image
                src={src}
                width={1000}
                height={1000}
                alt={alt}
                className="w-full h-full object-contain" 
            />
        </div>
    );
};
// ------------------------------------------

export default function AcessoCardFixo() {
    const router = useRouter(); 

    const handleAcessar = () => {
        router.push('/homepage'); 
    };

    const item = FIXED_ITEM_DATA;


    return (
        // Container Principal: Fundo Branco (ou Transparente) para remover o cinza da tela
        // Alterado: bg-gray-100 -> bg-white
        <div className="flex justify-center items-center font-sans"> 
            
            {/* Card Content: Fundo branco já definido */}
            <div className="flex w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden p-5 items-center h-full">
                
                {/* 1. TEXTO ESQUERDO (25%) */}
                <div className='flex flex-col w-1/4 justify-between py-4'>
                    <h2 className='text-3xl font-extrabold text-red-600 mb-6'>Olá, Fulano de Tal!</h2>
                    
                    {/* CariBox de Informação - Fundo cinza suave mantido aqui para contraste interno */}
                    <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 mb-6 text-sm items-center">
                        <h3 className="font-semibold text-lg mb-2">CariBox</h3>
                        <p className="text-gray-700">{item.model}</p>
                        <ul className="list-disc list-inside mt-2 text-gray-500 pl-4">
                            <li>x</li>
                            <li>x</li>
                            <li>x</li>
                            <li>x</li>
                        </ul>
                    </div>

<<<<<<< HEAD
=======
                    {/* Botão de Acesso */}
                    <button 
                        onClick={handleAcessar}
                        className=" bg-red-600 active:bg-red-800  py-3 rounded-lg text-base font-semibold transition duration-300 shadow-md"
                    >
                        Acessar
                    </button>
>>>>>>> af59d42d3cc4249fb6b4ff42cc9eed05fd25ae17
                </div>

                {/* 2. IMAGEM CENTRAL (50%) */}
                {/* Alterado: bg-gray-100 -> bg-white (para remover o cinza atrás do carro) */}
                <div className='w-1/2 flex items-center justify-center p-4 rounded-lg'>
                    <MeuCard
                        src={item.imageUrl}
                        alt={item.model}
                        className="w-full h-full max-h-72" 
                    />
                </div>

                {/* 3. TEXTO DIREITO (25%) */}
                <div className='w-1/4 flex items-center justify-center p-4'>
                    <p className='italic text-gray-700 leading-relaxed text-lg'>
                        "Revisar o carro novo é manter a garantia de fábrica e garantir a sua segurança a longo prazo."
                    </p>
                </div>
            </div>
        </div>
    );
}