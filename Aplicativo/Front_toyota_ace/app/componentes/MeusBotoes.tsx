"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- ESTADO INICIAL FALSO PARA SIMULAR DADOS DE LOGIN ---
// IMPORTANTE: Em um projeto real, esses dados viriam de um formulário.
// Aqui, eles são placeholders para que a função 'entrar' compile.
const initialLoginData = {
    email: 'user@example.com',
    senha: 'password123',
};


const BotaoMenu = ({ children, isPrimary = false, onClick }: any) => {
    // Estilos do Tailwind CSS baseados no seu design (botão cinza e botão vermelho/vinho)
    const baseClass = 'w-full py-4 px-6 rounded-xl text-lg font-bold shadow-md transition-all duration-300 transform';
    const primaryClass = 'bg-red-700 hover:bg-red-800 text-white scale-105'; // Estilo do 'Financiamento'
    const secondaryClass = 'bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800'; // Estilo dos outros botões

    return (
        <button
            onClick={onClick}
            className={`${baseClass} ${isPrimary ? primaryClass : secondaryClass}`}
        >
            {children}
        </button>
    );
}


export default function MenuBotoes() {
    // Definindo o estado para simular dados de login (necessário para a função 'entrar')
    const [loginData, setLoginData] = useState(initialLoginData); 
    const router = useRouter(); 

    // A função 'entrar' que você deseja adicionar
    const entrar = () => {
        // Lógica de validação: verifica se email ou senha estão vazios
        if (loginData.email === "" || loginData.senha === "") {
            alert("Usuário ou senha inválidos");
            return;
        }

        // Se a validação for OK, navega para a rota /order
        router.push("/order");
    };
    
    // Função genérica para botões que não requerem a validação de login
    const handleNavegacao = (path: string) => {
        router.push(path);
    };

    return (
        <div className="p-8 w-full"> {/* 'w-full' para ocupar a largura do container pai */}
            
            {/* Linha Superior (3 Botões) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                
                {/* O botão 'Financiamento' usa a função 'entrar' */}
                <BotaoMenu isPrimary onClick={entrar}>
                    Financiamento
                </BotaoMenu>

                <BotaoMenu onClick={() => handleNavegacao("/dados-pessoais")}>
                    Dados Pessoais
                </BotaoMenu>

                <BotaoMenu onClick={() => handleNavegacao("/agendar-retirada")}>
                    Agendar Retirada
                </BotaoMenu>
            </div>

            {/* Linha Inferior (2 Botões) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BotaoMenu onClick={() => handleNavegacao("/chatbot")}>
                    ChatBot
                </BotaoMenu>

                <BotaoMenu onClick={() => handleNavegacao("/garantia-toyota-10")}>
                    Garantia Toyota 10
                </BotaoMenu>
            </div>
        </div>
    );
}