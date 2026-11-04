"use client"

import { useState } from 'react';
import Image from 'next/image';

import Corolla from '@/app/assets/image/image/Toyota_Corolla_Altis_Hybrid_Premium_2024__preço__ficha_técnica__equipamentos_e_mais-removebg-preview.png'
import SW4 from '@/app/assets/image/image/sw4.png'
import Yaris from '@/app/assets/image/image/yaris.png'


// --- COMPONENTE MEUCARD SIMULADO (para compilação) ---
// Em seu projeto, remova este bloco e use a sua importação real.
const MeuCard = ({ descricao, className = '' }:any) => {
    // URL de fallback, caso a imagem principal falhe.
    const fallbackImage = 'https://placehold.co/600x400/CCCCCC/333333?text=Carro+Toyota';

    return (
        <div className={`rounded-lg overflow-hidden ${className}`}>
            <Image
                // 'descricao' agora é a URL da imagem placeholder
                src={descricao}
                width={1000}
                height={1000}
                alt="Imagem de Carro Toyota no Carrossel"
                className="w-full h-full object-contain" 
                onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                    e.currentTarget.onerror = null;
                }}
            />
        </div>
    );
};
// --- FIM DO COMPONENTE MEUCARD SIMULADO ---


// --- DADOS DO CARROSSEL USANDO PLACEHOLDERS (para compilação) ---
const CAROUSEL_DATA = [
    {
        imageUrl: Corolla,
        title: 'Toyota Corolla Sedan 2025',
        description: 'Um ícone de elegância e performance, o Corolla 2025 oferece tecnologia híbrida avançada e um interior espaçoso, redefinindo o padrão de sedans.',
    },
    {
        imageUrl: SW4,
        title: 'Toyota SW4 2025',
        description: 'Um ícone de elegância e performance, o Corolla 2025 oferece tecnologia híbrida avançada e um interior espaçoso, redefinindo o padrão de sedans.',
    },
    {
        imageUrl: Yaris,
        title: 'Toyota Yaris 2025',
        description: 'Um ícone de elegância e performance, o Corolla 2025 oferece tecnologia híbrida avançada e um interior espaçoso, redefinindo o padrão de sedans.',
    },
];

export default function Carrousel() {
    const [indexAtual, setIndexAtual] = useState(0);
    const totalItens = CAROUSEL_DATA.length;

    const goToPrevious = () => {
        setIndexAtual((prevIndex) => (prevIndex === 0 ? totalItens - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setIndexAtual((prevIndex) => (prevIndex === totalItens - 1 ? 0 : prevIndex + 1));
    };

    const currentItem = CAROUSEL_DATA[indexAtual];

    return (
        
        <div className='flex items-center justify-center  min-h-screen font-sans'> 
            <div className='flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-2xl rounded-lg overflow-hidden'>

                
                <div className='relative w-full md:w-2/3 flex flex-col justify-center items-center p-4 bg-gray-100'>
                    <div className='relative w-full max-w-xl h-96 flex justify-center items-center'>
                        <MeuCard
                            descricao={currentItem.imageUrl}
                            className="w-full h-full"
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            
                            <span className="text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded-full">
                                {currentItem.title}
                            </span>
                        </div>
                    </div>

                
                    <button
                        onClick={goToPrevious}
                        className='absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-black bg-opacity-60 text-white rounded-full hover:bg-opacity-80 transition-all duration-300 z-10 shadow-lg'
                        aria-label="Anterior"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className='absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-black bg-opacity-60 text-white rounded-full hover:bg-opacity-80 transition-all duration-300 z-10 shadow-lg'
                        aria-label="Próximo"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>

                    
                    <div className='flex justify-center mt-4 space-x-2'>
                        {CAROUSEL_DATA.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setIndexAtual(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === indexAtual
                                        ? 'bg-red-600 scale-125'
                                        : 'bg-gray-400 hover:bg-gray-600'
                                }`}
                                aria-label={`Ir para a imagem ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>


                <div className='w-full md:w-1/3 p-8 flex flex-col justify-center bg-white'>
                    <h2 className='text-4xl font-extrabold text-red-600 mb-6'>A História da Toyota</h2>
                    <p className='text-gray-700 leading-relaxed mb-6 text-lg'>
                        Fundada em 1937, a Toyota revolucionou a indústria automotiva com
                        inovação, qualidade e tecnologia sustentável. Seus veículos se tornaram
                        sinônimo de confiança, durabilidade e modernidade.
                    </p>
                    <p className='text-gray-700 leading-relaxed text-lg'>
                        Desde os clássicos até os modelos híbridos e elétricos, a Toyota segue
                        transformando o futuro da mobilidade com responsabilidade e excelência.
                    </p>
                </div>
            </div>
        </div>
    );
    
    

}