import React from 'react';

const ToyotaAceSection: React.FC = () => {
  return (
    // Container principal com fundo branco para a seção de texto
    <div className="bg-white text-gray-900 h-[10vh]">  
      {/* Rodapé (parte inferior da imagem original) */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          © 2025 Toyota do Brasil - Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
};

export default ToyotaAceSection;