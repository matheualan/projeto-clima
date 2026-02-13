import React from 'react';

/**
 * Props do componente Input
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Componente Input reutilizável
 * 
 * @component
 * @description Input estilizado com Tailwind CSS
 * Suporta label, erro e todas as props nativas de input
 * 
 * @example
 * <Input
 *   label="Cidade"
 *   placeholder="Digite o nome da cidade"
 *   value={city}
 *   onChange={(e) => setCity(e.target.value)}
 *   error={error}
 * />
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <input
        className={`
          w-full px-4 py-3 rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};
