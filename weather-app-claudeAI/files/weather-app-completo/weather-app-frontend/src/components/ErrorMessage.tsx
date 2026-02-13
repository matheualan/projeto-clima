import React from 'react';

/**
 * Props do componente ErrorMessage
 */
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Componente para exibir mensagens de erro
 * 
 * @component
 * @description Alert de erro amigável com opção de retry
 * 
 * @example
 * <ErrorMessage
 *   message="Cidade não encontrada"
 *   onRetry={handleRetry}
 * />
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          {/* Ícone de erro */}
          <div className="flex-shrink-0">
            <span className="text-4xl">❌</span>
          </div>

          {/* Conteúdo */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Ops! Algo deu errado
            </h3>
            <p className="text-red-700">{message}</p>

            {/* Botão de retry (se fornecido) */}
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Tentar novamente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
