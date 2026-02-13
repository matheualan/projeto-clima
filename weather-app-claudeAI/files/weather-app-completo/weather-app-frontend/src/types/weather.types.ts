/**
 * Tipos TypeScript para dados climáticos
 * 
 * @description Define contratos de dados entre frontend e backend
 * Garante type-safety em toda a aplicação
 */

/**
 * Coordenadas geográficas
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Dados climáticos atuais
 */
export interface CurrentWeather {
  temperature: number;
  windSpeed: number;
  humidity: number;
  weatherCode: number;
  time: string;
}

/**
 * Unidades de medida
 */
export interface WeatherUnits {
  temperature: string;
  windSpeed: string;
  humidity: string;
}

/**
 * Resposta completa da API de clima
 * 
 * @example
 * {
 *   city: "São Paulo",
 *   coordinates: { latitude: -23.5505, longitude: -46.6333 },
 *   current: {
 *     temperature: 25.5,
 *     windSpeed: 12.3,
 *     humidity: 65,
 *     weatherCode: 0,
 *     time: "2024-01-15T14:30:00"
 *   },
 *   timezone: "America/Sao_Paulo",
 *   units: { temperature: "°C", windSpeed: "km/h", humidity: "%" }
 * }
 */
export interface WeatherData {
  city: string;
  coordinates: Coordinates;
  current: CurrentWeather;
  timezone: string;
  units: WeatherUnits;
}

/**
 * Resposta de erro da API
 */
export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error?: string;
}

/**
 * Estados possíveis da requisição
 */
export type RequestState = 'idle' | 'loading' | 'success' | 'error';
