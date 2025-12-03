import React from "react";

export default function Login() {
  return (
    <div className="w-full min-h-screen bg-gray-300 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <p className="text-sm text-gray-600 mb-6">
          Digite os seus dados de acesso no campo abaixo.
        </p>

        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button className="text-sm text-gray-500 mb-4 hover:underline">
          Esqueci minha senha
        </button>

        
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition">
          Acessar
        </button>
      </div>
    </div>
  );
}