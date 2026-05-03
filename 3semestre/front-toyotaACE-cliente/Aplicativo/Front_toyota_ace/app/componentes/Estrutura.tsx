"use client";
import React, { useEffect } from 'react';
import Header from "./ui/Header"; 
import Rodape from "./ui/Rodape";
import { useAuth } from "../../src/contexts/AuthContext"; 

interface EstruturaProps {
  dados?: any;
  children?: React.ReactNode;
}

export default function Estrutura({ dados, children }: EstruturaProps) {
    const { setUser } = useAuth();

    useEffect(() => {
        // Se 'dados' chegar da API, precisamos injetá-los no Contexto Global
        if (dados && (dados.nome || dados.email)) {
            console.log("Sincronizando dados com o Header:", dados);
            setUser(dados); 
        }
    }, [dados, setUser]);

    // Verifique se o seu Java envia 'nome' ou 'nomeCliente'. Ajuste aqui se necessário:
    const listaDados = [
        { label: 'Nome', value: dados?.nome || 'Não informado', type: 'info' },
        { label: 'CPF', value: dados?.cpf || 'CPF não localizado', type: 'info' },
        { label: 'E-mail', value: dados?.email || 'Não informado', type: 'info' },
    ];

    return (
        <div className="w-full bg-neutral-100 min-h-screen">
            <Header />
            <main className="max-w-4xl mx-auto space-y-6 px-4 py-8"> 
                <div className="bg-white p-8 rounded-lg shadow-sm"> 
                    <h3 className="text-xl font-semibold mb-6 text-gray-900">
                        <span className="text-red-600 mr-2">Dados pessoais:</span>
                        Informações do Cliente
                    </h3>
                    <ul className="space-y-4">
                        {listaDados.map((item, index) => (
                            <li key={index} className="border-b border-gray-100 pb-2">
                                <p className="text-gray-800">
                                    <span className="font-bold text-gray-600">{item.label}:</span> {item.value}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                {children}
            </main>
            <Rodape />
        </div>
    );
}