import React from 'react';

const CarStatusPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* HEADER */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo Toyota Ace - Substitua pela sua imagem real do logo */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Toyota_logo-2023.svg/1024px-Toyota_logo-2023.svg.png" alt="Toyota Ace Logo" className="h-8 mr-2" />
          <span className="font-bold text-lg text-gray-800">TOYOTA ACE</span>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Garantia Toyota 10</a>
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-gray-900">
              Serviços
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
         
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </button>
        </nav>
      </header>

      {/* HERO SECTION - Faixa Azul */}
      <section className="bg-blue-600 bg-opacity-80 text-white py-12 px-6 flex flex-col items-center justify-center relative z-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Seu carro já está sendo preparado!
        </h2>
        {/* Imagem do carro - Substitua pela sua imagem real do carro */}
        <img 
          src="https://www.toyota.com.br/wp-content/uploads/2023/07/corolla-altis-premium-hybrid-2024-br-pc-02-1200x520.png" 
          alt="Toyota Corolla Altis Hybrid" 
          className="max-w-xl w-full h-auto mb-4" 
        />
        <p className="text-sm text-gray-200">Carro escolhido:</p>
      </section>

      {/* MAIN CONTENT - INFORMAÇÕES DO VEÍCULO E FICHA TÉCNICA */}
      <main className="container mx-auto px-6 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row md:space-x-8">
          
          {/* Coluna Esquerda: Informações Detalhadas do Veículo */}
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-red-600">Informações do Veículo:</h3>
            <ul className="text-gray-700 space-y-2">
              <li><strong className="font-semibold">Instituição :</strong> Banco Toyota</li>
              <li><strong className="font-semibold">Concessionária Responsável :</strong> Toyota Ramires Sorocaba</li>
              <li><strong className="font-semibold">Pedido :</strong> 1234388338</li>
              <li><strong className="font-semibold">Carro :</strong> Toyota Corolla Altis Hybrid Premium 2024</li>
              <li><strong className="font-semibold">Valor Total:</strong> R$ 183.000,00</li>
              <li><strong className="font-semibold">Entrada:</strong> R$ 100.000,00</li>
              <li><strong className="font-semibold">Parcelas Totais:</strong> 48</li>
              <li><strong className="font-semibold">Parcelas Pagas:</strong> 29</li>
              <li><strong className="font-semibold">Parcelas Atrasadas:</strong> 1</li>
              <li><strong className="font-semibold">Saldo Devedor:</strong> R$ 83.000,00</li>
            </ul>
            {/* Botão Pagar */}
            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out text-lg tracking-wider">
              PAGAR
            </button>
          </div>

          {/* Coluna Direita: Ficha Técnica */}
          <div className="md:w-1/3 bg-gray-300 bg-opacity-70 rounded-md p-6 flex flex-col items-center justify-center text-center">
            <p className="text-gray-800 mb-6 text-lg">
              Caso queira saber a ficha técnica do seu carro, clique no botão abaixo:
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out text-lg">
              FICHA TÉCNICA
            </button>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-6 text-center mt-auto">
        <p>© 2025 Toyota do Brasil - Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default CarStatusPage;