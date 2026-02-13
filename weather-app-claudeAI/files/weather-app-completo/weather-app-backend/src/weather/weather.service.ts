import {
  Injectable,
  NotFoundException,
  BadGatewayException,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { WeatherResponseDto } from './dto/weather-response.dto';
import {
  GeocodingResponse,
  WeatherForecastResponse,
} from './interfaces/open-meteo.interface';

/**
 * Serviço de Previsão do Tempo
 * 
 * @class WeatherService
 * @description Responsável pela lógica de negócio de busca de dados climáticos
 * 
 * Fluxo de execução:
 * 1. Recebe o nome da cidade
 * 2. Consulta Geocoding API para obter coordenadas
 * 3. Consulta Weather API com as coordenadas
 * 4. Formata e retorna os dados
 * 
 * @example
 * const weather = await weatherService.getWeatherByCity('São Paulo');
 */
@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly geocodingUrl: string;
  private readonly weatherUrl: string;
  private readonly apiTimeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {

    // // Carrega URLs e configurações do .env
    // this.geocodingUrl = this.configService.get<string>(
    //   'GEOCODING_API_URL',
    //   '',
    // );

    // this.weatherUrl = this.configService.get<string>(
    //   'WEATHER_API_URL',
    //   '',
    // );
    this.geocodingUrl = this.configService.getOrThrow<string>('GEOCODING_API_URL');
    this.weatherUrl = this.configService.getOrThrow<string>('WEATHER_API_URL');
    this.apiTimeout = Number(
      this.configService.get<string>('API_TIMEOUT') ?? 5000,
    );

    // this.geocodingUrl = this.configService.get<string>('GEOCODING_API_URL');
    // this.weatherUrl = this.configService.get<string>('WEATHER_API_URL');
    // this.apiTimeout = this.configService.get<number>('API_TIMEOUT', 5000);
  }

  /**
   * Busca previsão do tempo por nome da cidade
   * 
   * @param {string} cityName - Nome da cidade
   * @returns {Promise<WeatherResponseDto>} Dados climáticos formatados
   * @throws {NotFoundException} Quando cidade não é encontrada
   * @throws {BadGatewayException} Quando há erro na API externa
   * @throws {RequestTimeoutException} Quando a requisição excede o timeout
   * 
   * @example
   * const weather = await getWeatherByCity('São Paulo');
   * // Retorna:
   * // {
   * //   city: "São Paulo",
   * //   coordinates: { latitude: -23.5505, longitude: -46.6333 },
   * //   current: { temperature: 25.5, windSpeed: 12.3, humidity: 65, ... },
   * //   ...
   * // }
   */
  async getWeatherByCity(cityName: string): Promise<WeatherResponseDto> {
    this.logger.log(`Buscando previsão do tempo para: ${cityName}`);

    try {
      // ETAPA 1: Buscar coordenadas da cidade
      const coordinates = await this.getCoordinates(cityName);

      // ETAPA 2: Buscar dados climáticos com as coordenadas
      const weatherData = await this.getWeatherData(
        coordinates.latitude,
        coordinates.longitude,
      );

      // ETAPA 3: Formatar e retornar resposta
      const response = new WeatherResponseDto({
        city: cityName,
        coordinates: {
          latitude: weatherData.latitude,
          longitude: weatherData.longitude,
        },
        current: {
          temperature: weatherData.current.temperature_2m,
          windSpeed: weatherData.current.wind_speed_10m,
          humidity: weatherData.current.relative_humidity_2m,
          weatherCode: weatherData.current.weather_code,
          time: weatherData.current.time,
        },
        timezone: weatherData.timezone,
        units: {
          temperature: weatherData.current_units.temperature_2m,
          windSpeed: weatherData.current_units.wind_speed_10m,
          humidity: weatherData.current_units.relative_humidity_2m,
        },
      });

      this.logger.log(
        `Previsão obtida com sucesso para ${cityName}: ${response.current.temperature}${response.units.temperature}`,
      );

      return response;
    } catch (error) {
      // Propaga exceções conhecidas
      if (
        error instanceof NotFoundException ||
        error instanceof BadGatewayException ||
        error instanceof RequestTimeoutException
      ) {
        throw error;
      }

      // Erro inesperado
      this.logger.error(`Erro inesperado ao buscar clima: ${error.message}`, error.stack);
      throw new BadGatewayException(
        'Erro ao processar dados climáticos. Tente novamente mais tarde.',
      );
    }
  }

  /**
   * Obtém coordenadas geográficas de uma cidade
   * 
   * @private
   * @param {string} cityName - Nome da cidade
   * @returns {Promise<{latitude: number, longitude: number}>} Coordenadas
   * @throws {NotFoundException} Quando cidade não é encontrada
   * @throws {BadGatewayException} Quando há erro na API
   * @throws {RequestTimeoutException} Quando timeout é excedido
   */
  private async getCoordinates(
    cityName: string,
  ): Promise<{ latitude: number; longitude: number }> {
    try {
      this.logger.debug(`Buscando coordenadas para: ${cityName}`);

      const response = await firstValueFrom(
        this.httpService
          .get<GeocodingResponse>(this.geocodingUrl, {
            params: {
              name: cityName,
              count: 1, // Retorna apenas o resultado mais relevante
              language: 'pt', // Preferência por nomes em português
              format: 'json',
            },
          })
          .pipe(
            timeout(this.apiTimeout),
            catchError((error: AxiosError) => {
              if (error.code === 'ECONNABORTED') {
                this.logger.error('Timeout ao buscar coordenadas');
                throw new RequestTimeoutException(
                  'A busca por coordenadas demorou muito. Tente novamente.',
                );
              }
              throw error;
            }),
          ),
      );

      // Valida se encontrou resultados
      if (!response.data.results || response.data.results.length === 0) {
        this.logger.warn(`Cidade não encontrada: ${cityName}`);
        throw new NotFoundException(
          `Cidade "${cityName}" não encontrada. Verifique o nome e tente novamente.`,
        );
      }

      const location = response.data.results[0];
      this.logger.debug(
        `Coordenadas encontradas: lat=${location.latitude}, lon=${location.longitude}`,
      );

      return {
        latitude: location.latitude,
        longitude: location.longitude,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof RequestTimeoutException
      ) {
        throw error;
      }

      this.logger.error(`Erro ao buscar coordenadas: ${error.message}`, error.stack);
      throw new BadGatewayException(
        'Erro ao comunicar com o serviço de geocodificação. Tente novamente.',
      );
    }
  }

  /**
   * Obtém dados climáticos atuais de uma localização
   * 
   * @private
   * @param {number} latitude - Latitude
   * @param {number} longitude - Longitude
   * @returns {Promise<WeatherForecastResponse>} Dados climáticos
   * @throws {BadGatewayException} Quando há erro na API
   * @throws {RequestTimeoutException} Quando timeout é excedido
   */
  private async getWeatherData(
    latitude: number,
    longitude: number,
  ): Promise<WeatherForecastResponse> {
    try {
      this.logger.debug(
        `Buscando dados climáticos para lat=${latitude}, lon=${longitude}`,
      );

      const response = await firstValueFrom(
        this.httpService
          .get<WeatherForecastResponse>(this.weatherUrl, {
            params: {
              latitude,
              longitude,
              current: [
                'temperature_2m',
                'relative_humidity_2m',
                'wind_speed_10m',
                'weather_code',
              ].join(','),
              timezone: 'auto', // Detecta automaticamente o fuso horário
            },
          })
          .pipe(
            timeout(this.apiTimeout),
            catchError((error: AxiosError) => {
              if (error.code === 'ECONNABORTED') {
                this.logger.error('Timeout ao buscar dados climáticos');
                throw new RequestTimeoutException(
                  'A busca por dados climáticos demorou muito. Tente novamente.',
                );
              }
              throw error;
            }),
          ),
      );

      this.logger.debug(
        `Dados climáticos obtidos: temp=${response.data.current.temperature_2m}°C`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof RequestTimeoutException) {
        throw error;
      }

      this.logger.error(`Erro ao buscar dados climáticos: ${error.message}`, error.stack);
      throw new BadGatewayException(
        'Erro ao comunicar com o serviço meteorológico. Tente novamente.',
      );
    }
  }
}
