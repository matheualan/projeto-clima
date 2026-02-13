import axios, { AxiosError } from 'axios';
import { WeatherData, ErrorResponse } from '../types/weather.types';

/**
 * Configuração da URL base da API
 * Em produção, usar variável de ambiente
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Cliente Axios configurado
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Serviço de API para previsão do tempo
 * 
 * @class WeatherService
 * @description Centraliza todas as chamadas HTTP para a API de clima
 * 
 * @example
 * try {
 *   const weather = await WeatherService.getWeatherByCity('São Paulo');
 *   console.log(weather.current.temperature);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export class WeatherService {
  /**
   * Busca previsão do tempo por nome da cidade
   * 
   * @param {string} city - Nome da cidade
   * @returns {Promise<WeatherData>} Dados climáticos
   * @throws {Error} Quando requisição falha
   * 
   * @example
   * const weather = await WeatherService.getWeatherByCity('Rio de Janeiro');
   * // Retorna: { city: "Rio de Janeiro", current: { temperature: 28, ... }, ... }
   */
  static async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await apiClient.get<WeatherData>('/weather', {
        params: { city },
      });

      return response.data;
    } catch (error) {
      // Tratamento específico para erros HTTP
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;

        // Erro de resposta da API (4xx, 5xx)
        if (axiosError.response) {
          const errorData = axiosError.response.data;
          throw new Error(
            errorData.message || 'Erro ao buscar dados climáticos'
          );
        }

        // Erro de timeout
        if (axiosError.code === 'ECONNABORTED') {
          throw new Error(
            'A requisição demorou muito. Verifique sua conexão e tente novamente.'
          );
        }

        // Erro de rede (sem resposta do servidor)
        if (axiosError.request) {
          throw new Error(
            'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.'
          );
        }
      }

      // Erro genérico
      throw new Error(
        'Ocorreu um erro inesperado. Tente novamente mais tarde.'
      );
    }
  }

  /**
   * Verifica saúde da API
   * 
   * @returns {Promise<boolean>} true se API está disponível
   */
  static async checkHealth(): Promise<boolean> {
    try {
      await apiClient.get('/weather/health');
      return true;
    } catch {
      return false;
    }
  }
}
