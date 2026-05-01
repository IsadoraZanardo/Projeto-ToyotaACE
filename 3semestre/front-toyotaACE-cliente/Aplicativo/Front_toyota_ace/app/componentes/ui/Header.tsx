"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
// Use caminhos relativos (../) para subir as pastas corretamente
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/image/image/logoT.png";

export default function Header() {
  const router = useRouter()
  const { user, logout } = useAuth()

  // Pega apenas o primeiro nome da Isabelle
  const primeiroNome = user?.nome?.trim().split(' ')[0] || "Usuário"

  return (
    <>
      <header className="max-w-screen h-[10vh] bg-black flex items-center justify-around px-4">
        <div className="flex items-center gap-2">
          <Image alt="logo" src={Logo} className="w-[10vh]" />
          <h1 className="text-xl font-semibold text-white">Toyota ACE</h1>
        </div>

        <nav className="flex items-center gap-10 text-white font-medium">
          <span className="text-white font-bold">{primeiroNome}</span>
          
          <button onClick={() => { logout(); router.push('/login'); }} className="text-white">
            Sair
          </button>
        </nav>
      </header>
      <div className="w-full h-[4px] bg-red-600"></div>
    </>
  )
}