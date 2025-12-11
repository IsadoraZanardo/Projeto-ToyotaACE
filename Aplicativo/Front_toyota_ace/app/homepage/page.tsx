import Header from "../componentes/Header"
import HeroSection from "../componentes/HeroSection"
import Backdrop from "../componentes/Backdrop"
import Card from "../componentes/ui/Card"
import Login from "../login/page"
import Rodape from "../componentes/ui/Rodape"

export default function Home(){
  return(
   <div className=''>
    <Header/> 
    <Backdrop/>
    <div className='h-screen flex items-center p-8'>
      <Card/>
    </div>
    {/* Seção principal do conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between">
          
         
        </div>
      </div>
    <Rodape/>
    </div>
  )
}
