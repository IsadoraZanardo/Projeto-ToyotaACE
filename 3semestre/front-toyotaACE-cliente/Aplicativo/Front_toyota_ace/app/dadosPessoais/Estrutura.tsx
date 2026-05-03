import React, { useEffect } from 'react';
import Header from "../componentes/ui/Header"; 
import Rodape from "../componentes/ui/Rodape";
// Se o @ der erro, use: import { useAuth } from "../../contexts/AuthContext";
import { useAuth } from "../../src/contexts/AuthContext";
interface EstruturaProps {
  dados?: {
    nome: string;
    cpf: string;
    email: string;
    telefone?: string;
    modeloVeiculo?: string;
    statusVeiculo?: string;
    imagemVeiculo?: string;
  };
}

export default function Estrutura({ dados }: EstruturaProps) {
    const { setUser } = useAuth();

    useEffect(() => {
        // Log para depuração: veja no F12 se os dados da Isabelle aparecem aqui
        console.log("Dados recebidos na Estrutura:", dados);
        
        if (dados) {
            setUser(dados); // Atualiza o Header (Usuário -> Isabelle)
        }
    }, [dados, setUser]);

    // Se os dados ainda não carregaram, mostramos um estado de carregamento
    if (!dados) {
        return <div className="flex justify-center items-center h-screen">Carregando dados...</div>;
    }

    const listaDados = [
        { label: 'Nome', value: dados.nome, type: 'info' },
        { label: 'CPF', value: dados.cpf, type: 'info' },
        { label: 'E-mail', value: dados.email, type: 'info' },
        { label: 'RG', status: 'Enviado', type: 'document' },
        { label: 'CPF', status: 'Enviado', type: 'document' },
        { label: 'CNH', status: 'Enviado', type: 'document' },
        { label: 'Endereço', status: 'Enviado', type: 'document' },
        { label: 'Renda', status: 'Enviado', type: 'document' },
    ];

    return (
        <div className="w-full bg-neutral-100 min-h-screen">
            <Header />
            
            <main className="max-w-4xl mx-auto space-y-6 px-4 py-8"> 
                <div className="bg-neutral-100 p-8 pt-10">
                    <h1 className="text-center text-3xl md:text-4xl font-semibold text-red-600 mb-8">
                        Seu {dados.modeloVeiculo || "carro"} já está sendo preparado!
                    </h1>
                    
                    <div className="text-center">
                        <img 
                            src={dados.imagemVeiculo || "https://via.placeholder.com/600x300?text=Toyota"} 
                            alt="Carro Escolhido" 
                            className="max-w-xl mx-auto h-auto object-contain"
                        />
                    </div>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600 mb-1">Status atual:</p>
                        <p className="text-base font-bold text-red-600 uppercase tracking-widest">
                            {dados.statusVeiculo || "PINTURA"}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm"> 
                    <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900">
                        <span className="text-red-600 mr-2">Dados pessoais:</span>
                        Seus dados já foram aprovados!
                    </h3>
                    
                    <ul className="space-y-3 text-gray-800 text-base">
                        {listaDados.map((item, index) => (
                            <li key={index} className="flex items-start">
                                {item.type === 'info' ? (
                                    <p>
                                        <span className="font-bold">{item.label}:</span> {item.value}
                                    </p>
                                ) : (
                                    <p className="flex items-center">
                                        <span className="text-green-600 mr-2 text-lg">✅</span> 
                                        <span className="font-bold">{item.label}</span> 
                                        <span className="text-gray-500 ml-2">- {item.status}</span>
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Rodape />
        </div>
    );
}