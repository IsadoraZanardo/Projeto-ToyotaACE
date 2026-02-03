import React from 'react';
import Header from "../componentes/Header";
import Rodape from "../componentes/ui/Rodape";

// Dados de exemplo (Para tornar o componente dinâmico)
const dadosPessoais = [
  { label: 'Nome', value: 'João Silva', type: 'info' },
  { label: 'CPF', value: '123.456.789-00', type: 'info' },
  { label: 'E-mail', value: 'joaosilva@gmail.com', type: 'info' },
  { label: 'Telefone', value: '(11) 91234-5678', type: 'info' },
  { label: 'RG', status: 'Enviado', type: 'document' },
  { label: 'CPF', status: 'Enviado', type: 'document' },
  { label: 'CNH', status: 'Enviado', type: 'document' },
  { label: 'Comprovante de Endereço ', status: ' Enviado', type: 'document' },
  { label: 'Comprovante de Renda ', status: ' Enviado', type: 'document' },
];

// O seu componente Estrutura agora é a página completa
export default function Estrutura() {
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
                        <span className="text-red-600 mr-2">Dados pessoais:</span>
                        <span className="text-gray-900">Seus dados já foram aprovados!</span>
                    </h3>
                    
                    {/* Lista de Dados e Status de Documentos */}
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
                                        <span className="text-gray-700">- {item.status}</span>
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* FIM DO CONTEÚDO DA PÁGINA */}

            </main>
            
            <Rodape/>
        </div>
    )
}