import Header from '@/app/componentes/Header'
import HeroSection from './componentes/HeroSection'
import Backdrop from './componentes/Backdrop'
import Carrousel from './componentes/ui/Carrousel'
import Rodape from './componentes/ui/Rodape'
import Login from './login/page'


export default function Home(){
  return(
   <div className=''>
    <Header/> 
    <Backdrop/>
    <div className='h-screen flex items-center p-8'>
      <Carrousel/>
    </div>
    {/* Seção principal do conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between">
          
          {/* Coluna da esquerda: Texto principal */}
          <div className="lg:w-3/5">
            <h1 className="text-4xl sm:text-5xl font-light mb-8">
              Por que usar o aplicativo?
            </h1>
            
            <p className="text-lg mb-4">
              O <span className="font-bold">TOYOTA ACE</span> é a solução ideal para quem quer acompanhar seu carro com facilidade e praticidade.
            </p>
            
            <p className="text-lg mb-8">
              Criado com foco na sua jornada como cliente, ele reúne três pilares essenciais:
            </p>
            
            <p className="text-lg">
              Com o <span className="font-bold">TOYOTA ACE</span>, você acompanha seu pedido em tempo real, recebe atualizações importantes e
              vive uma experiência digital completa, onde quer que esteja.
            </p>
          </div>
          
          {/* Coluna da direita: Pilares (ACE) */}
          <div className="lg:w-1/5 mt-10 lg:mt-0 flex justify-start lg:justify-end">
            <div className="text-xl leading-relaxed">
              <span className="font-bold">A</span>cessibilidade<br/>
              <span className="font-bold">C</span>onectividade<br/>
              <span className="font-bold">E</span>xperiência
            </div>
          </div>
        </div>
      </div>
    <Rodape/>
    </div>
  )
}
