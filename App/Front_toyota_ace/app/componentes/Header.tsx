"use client"

import Button from '@/app/componentes/ui/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Logo from '@/app/assets/image/image/Logo.png'


export default function Header() {
  const router = useRouter()
  const levaToyota10 = ()=>{
    router.push('https://www.toyota.com.br/meu-toyota/garantia-toyota-10')
  }


  return (
    <header className="max-w-screen h-[10vh] border-b-2 border-gray-200 flex items-center justify-around">
      <div className="flex items-center gap-2">
        <Image
        alt="logo"
        src={Logo}
        className='w-[10vh]'
        />
        <h1 className="text-xl font-semibold">Toyota ACE</h1>
      </div>

      <nav className="flex gap-10 text-gray-700 font-medium">
        <a href="#" className="hover:text-red-600 transition-colors">Home</a>
        <a href="https://www.toyota.com.br/meu-toyota/garantia-toyota-10" className="hover:text-red-600 transition-colors" onClick={levaToyota10}>Garantia Toyota 10</a>
        <a href="" className="hover:text-red-600 transition-colors">Serviços</a>
        <a href="login" className="hover:text-red-600 transition-colors">Login</a>
      </nav>
    </header>
  )
}