"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"
import Logo from '@/app/assets/image/image/logoT.png'

export default function Cadastro() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: ""
  })

  const atualizaInput = (e: any, campo: string) => {
    setFormData({
      ...formData,
      [campo]: e.target.value
    })
  }

  const cadastrar = () => {
    if (
      formData.nome === "" ||
      formData.cpf === "" ||
      formData.email === "" ||
      formData.senha === ""
    ) {
      alert("Preencha todos os campos")
      return
    }

    alert("Cadastro realizado com sucesso 🚀")
    router.push("/homepage")
  }

  return (
    <div className="w-full min-h-screen bg-[url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/c84ab249239255.56085275bc31a.png')] bg-center bg-cover flex flex-col items-center justify-center p-4">
      
      <h1 className="text-white text-4xl font-bold mb-6 flex items-center gap-3">
        <img 
  src={Logo.src}
  alt="Logo"
  className="w-10 h-10"
/>
        TOYOTA ACE
      </h1>

      <div className="bg-white/55 backdrop-blur-[10px] w-full max-w-xl rounded-3xl shadow-md p-8 border border-white/20">
        
        <h1 className="text-2xl font-semibold text-black mb-2">Cadastro</h1>
        <p className="text-sm text-black mb-6">
          Preencha os dados abaixo para criar sua conta.
        </p>

        {/* Nome */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">Nome completo</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            onChange={(e) => atualizaInput(e, "nome")}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* CPF */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">CPF</label>
          <input
            type="text"
            placeholder="Digite seu CPF"
            onChange={(e) => atualizaInput(e, "cpf")}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => atualizaInput(e, "email")}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Senha */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => atualizaInput(e, "senha")}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          onClick={cadastrar}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition"
        >
          Cadastrar
        </button>

      </div>

    </div>
  )
}