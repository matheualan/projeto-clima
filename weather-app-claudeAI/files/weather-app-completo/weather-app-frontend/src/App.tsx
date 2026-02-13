import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { WeatherCard } from './components/WeatherCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WeatherService } from './services/weather.service';
import { WeatherData, RequestState } from './types/weather.types';

/**
 * Componente principal da aplicação
 * 
 * @component
 * @description Gerencia estado global e orquestra componentes
 * 
 * Estados gerenciados:
 * - weatherData: Dados climáticos retornados pela API
 * - requestState: Estado atual da requisição (idle | loading | success | error)
 * - errorMessage: Mensagem de erro para exibir ao usuário
 */
function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [requestState, setRequestState] = useState<RequestState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Busca previsão do tempo por cidade
   * 
   * @param {string} city - Nome da cidade
   */
  const handleSearch = async (city: string) => {
    // Reseta estados anteriores
    setRequestState('loading');
    setErrorMessage('');
    setWeatherData(null);

    try {
      // Faz requisição à API
      const data = await WeatherService.getWeatherByCity(city);

      // Atualiza estado com sucesso
      setWeatherData(data);
      setRequestState('success');
    } catch (error) {
      // Trata erro
      const message = error instanceof Error
        ? error.message
        : 'Erro desconhecido ao buscar dados climáticos';

      setErrorMessage(message);
      setRequestState('error');
    }
  };

  /**
   * Permite tentar novamente após erro
   */
  const handleRetry = () => {
    setRequestState('idle');
    setErrorMessage('');
    setWeatherData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Container principal */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Formulário de busca (sempre visível) */}
        <SearchForm onSearch={handleSearch} isLoading={requestState === 'loading'} />

        {/* Espaçamento */}
        <div className="mt-8">
          {/* Estado: Loading */}
          {requestState === 'loading' && <LoadingSpinner />}

          {/* Estado: Success */}
          {requestState === 'success' && weatherData && (
            <WeatherCard data={weatherData} />
          )}

          {/* Estado: Error */}
          {requestState === 'error' && (
            <ErrorMessage message={errorMessage} onRetry={handleRetry} />
          )}

          {/* Estado: Idle - Mensagem de boas-vindas */}
          {requestState === 'idle' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-bounce">🌍</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Bem-vindo ao Weather App!
              </h2>
              <p className="text-gray-500">
                Digite o nome de uma cidade acima para ver a previsão do tempo
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>
            Dados fornecidos por{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Open-Meteo API
            </a>
          </p>
          <p className="mt-2">
            Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
