// estrutura.tsx (o que está na pasta componentes)
import React, { useEffect } from 'react';
import Header from "../componentes/ui/Header"; // Verifique se este é o caminho correto
import Rodape from "../componentes/ui/Rodape";
import { useAuth } from "../contexts/AuthContext";
interface EstruturaProps {
  dados?: any; 
  children?: React.ReactNode; 
}

export default function Estrutura({ dados, children }: EstruturaProps) {
    const { setUser } = useAuth();

    useEffect(() => {
        // Se 'dados' (Isabelle) chegou do banco, salvamos no AuthContext
        if (dados) {
            setUser(dados);
        }
    }, [dados, setUser]);

    return (
        <div className="w-full bg-neutral-100 min-h-screen">
            <Header />
            <main className="max-w-4xl mx-auto space-y-6 px-4 py-8">
                <div className="bg-neutral-100 p-8 pt-10">
                    <h1 className="text-center text-3xl md:text-4xl font-semibold text-red-600 mb-8">
                        Seu {dados?.modeloVeiculo || "carro"} já está sendo preparado!
                    </h1>
                    <div className="flex justify-center">
                        {children}
                    </div>
                </div>

                {/* Exibição dos dados diretamente na tela */}
                <div className="bg-white p-8 rounded-lg shadow-sm"> 
                    <h3 className="text-xl font-semibold mb-6 text-red-600">Dados pessoais:</h3>
                    <ul className="space-y-3 text-gray-800">
                        <li><span className="font-bold">Nome:</span> {dados?.nome || "Carregando..."}</li>
                        <li><span className="font-bold">CPF:</span> {dados?.cpf || "Carregando..."}</li>
                        <li><span className="font-bold">E-mail:</span> {dados?.email || "Carregando..."}</li>
                    </ul>
                </div>
            </main>
            <Rodape />
        </div>
    );
}