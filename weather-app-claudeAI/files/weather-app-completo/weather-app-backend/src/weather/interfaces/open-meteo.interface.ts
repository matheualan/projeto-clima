/**
 * Interfaces de tipos para as respostas da Open-Meteo API
 * 
 * @description Define a estrutura exata dos dados retornados pelas APIs externas
 * Isso garante type-safety e facilita a manutenção do código
 */

/**
 * Resultado individual de geocodificação
 */
export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  timezone?: string;
  population?: number;
  country?: string;
  country_id?: number;
}

/**
 * Resposta completa da Geocoding API
 * 
 * @example
 * {
 *   results: [
 *     {
 *       id: 3448439,
 *       name: "São Paulo",
 *       latitude: -23.5505,
 *       longitude: -46.6333,
 *       country: "Brazil",
 *       timezone: "America/Sao_Paulo"
 *     }
 *   ],
 *   generationtime_ms: 0.234
 * }
 */
export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms?: number;
}

/**
 * Unidades de medida retornadas pela Weather API
 */
export interface WeatherUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
  weather_code?: string;
}

/**
 * Dados climáticos atuais retornados pela API
 */
export interface CurrentWeatherData {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

/**
 * Resposta completa da Weather Forecast API
 * 
 * @example
 * {
 *   latitude: -23.5505,
 *   longitude: -46.6333,
 *   timezone: "America/Sao_Paulo",
 *   timezone_abbreviation: "BRT",
 *   elevation: 760.0,
 *   current_units: {
 *     time: "iso8601",
 *     temperature_2m: "°C",
 *     relative_humidity_2m: "%",
 *     wind_speed_10m: "km/h"
 *   },
 *   current: {
 *     time: "2024-01-15T14:30",
 *     temperature_2m: 25.5,
 *     relative_humidity_2m: 65,
 *     wind_speed_10m: 12.3,
 *     weather_code: 0
 *   }
 * }
 */
export interface WeatherForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: WeatherUnits;
  current: CurrentWeatherData;
}
