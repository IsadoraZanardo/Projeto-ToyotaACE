"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"
import Logo from '@/app/assets/image/image/logoT.png'

export default function Login() {
  const router = useRouter()

  const [loginData, setLoginData] = useState({
    email: "",
    senha: ""
  })

  const atualizaInput = (evento: any, tipoInput: string) => {
    if (tipoInput === "email") {
      setLoginData({
        email: evento.target.value,
        senha: loginData.senha
      })
    } else {
      setLoginData({
        email: loginData.email,
        senha: evento.target.value
      })
    }
  }

  const entrar = () => {
    if (loginData.email === "" || loginData.senha === "") {
      alert("Usuário ou senha inválidos")
      return
    }

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
        
        <h1 className="text-2xl font-semibold text-black mb-2">Login</h1>
        <p className="text-sm text-black mb-6">
          Digite os seus dados de acesso no campo abaixo.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => atualizaInput(e, "email")}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1 text-black">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => atualizaInput(e, "senha")}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button className="text-sm text-black mb-4 hover:underline">
          Esqueci minha senha
        </button>

        <button
          onClick={entrar}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition"
        >
          Acessar
        </button>

      </div>

    </div>
  )
}