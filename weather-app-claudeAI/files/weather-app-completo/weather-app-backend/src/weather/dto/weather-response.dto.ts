/**
 * Interface para coordenadas geográficas
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Interface para dados climáticos atuais
 */
export interface CurrentWeather {
  temperature: number;
  windSpeed: number;
  humidity: number;
  weatherCode: number;
  time: string;
}

/**
 * DTO (Data Transfer Object) de resposta da API de previsão do tempo
 * 
 * @class WeatherResponseDto
 * @description Padroniza a estrutura de resposta enviada ao frontend
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
 *   units: {
 *     temperature: "°C",
 *     windSpeed: "km/h",
 *     humidity: "%"
 *   }
 * }
 */
export class WeatherResponseDto {
  /**
   * Nome da cidade pesquisada
   */
  city: string;

  /**
   * Coordenadas geográficas da cidade
   */
  coordinates: Coordinates;

  /**
   * Dados climáticos atuais
   */
  current: CurrentWeather;

  /**
   * Fuso horário da cidade
   */
  timezone: string;

  /**
   * Unidades de medida utilizadas
   */
  units: {
    temperature: string;
    windSpeed: string;
    humidity: string;
  };

  constructor(partial: Partial<WeatherResponseDto>) {
    Object.assign(this, partial);
  }
}
