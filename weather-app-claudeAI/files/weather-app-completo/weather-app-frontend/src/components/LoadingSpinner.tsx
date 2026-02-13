import React from 'react';

/**
 * Componente de Loading
 * 
 * @component
 * @description Spinner animado para estado de carregamento
 * 
 * @example
 * {isLoading && <LoadingSpinner />}
 */
export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      {/* Spinner principal */}
      <div className="relative">
        {/* Círculo externo */}
        <div className="w-24 h-24 border-8 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        
        {/* Ícone central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🌤️</span>
        </div>
      </div>

      {/* Texto de loading */}
      <p className="mt-6 text-lg font-medium text-gray-700">
        Buscando previsão do tempo...
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Aguarde um momento
      </p>
    </div>
  );
};
