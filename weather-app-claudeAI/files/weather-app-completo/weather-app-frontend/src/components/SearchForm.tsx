import React, { useState, FormEvent } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { isValidCityName } from '../utils/weather.utils';

/**
 * Props do componente SearchForm
 */
interface SearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

/**
 * Componente de formulário de busca
 * 
 * @component
 * @description Formulário para buscar previsão do tempo por cidade
 * Inclui validação local antes de enviar
 * 
 * @example
 * <SearchForm
 *   onSearch={handleSearch}
 *   isLoading={isSearching}
 * />
 */
export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const [localError, setLocalError] = useState('');

  /**
   * Valida e submete formulário
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError('');

    // Validação local
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setLocalError('Por favor, digite o nome de uma cidade');
      return;
    }

    if (!isValidCityName(trimmedCity)) {
      setLocalError('O nome da cidade deve ter entre 2 e 100 caracteres');
      return;
    }

    // Submete busca
    onSearch(trimmedCity);
  };

  /**
   * Limpa erro ao digitar
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    if (localError) setLocalError('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          🌤️ Previsão do Tempo
        </h1>

        <div className="space-y-4">
          <Input
            type="text"
            label="Cidade"
            placeholder="Digite o nome da cidade (ex: São Paulo)"
            value={city}
            onChange={handleChange}
            error={localError}
            disabled={isLoading}
            autoFocus
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full"
          >
            {isLoading ? 'Buscando...' : 'Buscar Previsão'}
          </Button>
        </div>

        {/* Dicas de uso */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Dica:</strong> Digite o nome completo da cidade para resultados mais precisos.
            Exemplo: "Rio de Janeiro" ou "Belo Horizonte".
          </p>
        </div>
      </div>
    </form>
  );
};
