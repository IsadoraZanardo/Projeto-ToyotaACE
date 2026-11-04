"use client"

import Button from '@/app/componentes/ui/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Logo from '@/app/assets/image/image/logoT.png'

export default function Header() {
  const router = useRouter()

  const levaToyota10 = () => {
    router.push('https://www.toyota.com.br/meu-toyota/garantia-toyota-10')
  }

 return (
  <>
    <header className="max-w-screen h-[10vh] bg-black flex items-center justify-around">
      <div className="flex items-center gap-2">
        <Image
          alt="logo"
          src={Logo}
          className="w-[10vh]"
        />
        <h1 className="text-xl font-semibold text-white">Toyota ACE</h1>
      </div>

      <nav className="flex gap-10 text-white font-medium">
        <a 
          href="https://www.toyota.com.br/meu-toyota/garantia-toyota-10" 
          className="hover:text-red-500 transition-colors"
          onClick={levaToyota10}
        >
          Garantia Toyota 10
        </a>

        <a 
          href="login" 
          className="hover:text-red-500 transition-colors"
        >
          Login
        </a>

          <a 
          href="cadastro" 
          className="hover:text-red-500 transition-colors"
        >
          Cadastrar
        </a>
      </nav>
    </header>

    {/* Linha vermelha */}
    <div className="w-full h-[4px] bg-red-600"></div>
  </>
)}