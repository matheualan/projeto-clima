import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  NotFoundException,
  BadGatewayException,
  RequestTimeoutException,
} from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { WeatherService } from './weather.service';

/**
 * Testes Unitários para WeatherService
 * 
 * @description Testa todas as funcionalidades do serviço de clima
 * incluindo casos de sucesso e falha
 * 
 * Casos cobertos:
 * - ✅ Busca bem-sucedida de previsão do tempo
 * - ❌ Cidade não encontrada
 * - ❌ Timeout na API de geocodificação
 * - ❌ Timeout na API de clima
 * - ❌ Erro genérico nas APIs
 */
describe('WeatherService', () => {
  let service: WeatherService;
  let httpService: HttpService;

  // Mocks de respostas das APIs
  const mockGeocodingResponse: AxiosResponse = {
    data: {
      results: [
        {
          id: 3448439,
          name: 'São Paulo',
          latitude: -23.5505,
          longitude: -46.6333,
          country: 'Brazil',
          timezone: 'America/Sao_Paulo',
        },
      ],
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  };

  const mockWeatherResponse: AxiosResponse = {
    data: {
      latitude: -23.5505,
      longitude: -46.6333,
      timezone: 'America/Sao_Paulo',
      timezone_abbreviation: 'BRT',
      elevation: 760.0,
      current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°C',
        relative_humidity_2m: '%',
        wind_speed_10m: 'km/h',
      },
      current: {
        time: '2024-01-15T14:30',
        interval: 900,
        temperature_2m: 25.5,
        relative_humidity_2m: 65,
        wind_speed_10m: 12.3,
        weather_code: 0,
      },
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                GEOCODING_API_URL: 'https://geocoding-api.open-meteo.com/v1/search',
                WEATHER_API_URL: 'https://api.open-meteo.com/v1/forecast',
                API_TIMEOUT: 5000,
              };
              return (config as any)[key];
              // return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  /**
   * TESTE 1: Busca bem-sucedida de previsão do tempo
   */
  describe('getWeatherByCity - Sucesso', () => {
    it('deve retornar dados climáticos quando cidade é válida', async () => {
      // Arrange: Configura mocks para retornar dados válidos
      jest.spyOn(httpService, 'get')
        .mockReturnValueOnce(of(mockGeocodingResponse)) // Primeira chamada: geocoding
        .mockReturnValueOnce(of(mockWeatherResponse)); // Segunda chamada: weather

      // Act: Executa método
      const result = await service.getWeatherByCity('São Paulo');

      // Assert: Verifica resultado
      expect(result).toBeDefined();
      expect(result.city).toBe('São Paulo');
      expect(result.coordinates.latitude).toBe(-23.5505);
      expect(result.coordinates.longitude).toBe(-46.6333);
      expect(result.current.temperature).toBe(25.5);
      expect(result.current.windSpeed).toBe(12.3);
      expect(result.current.humidity).toBe(65);
      expect(result.timezone).toBe('America/Sao_Paulo');
    });
  });

  /**
   * TESTE 2: Cidade não encontrada
   */
  describe('getWeatherByCity - Cidade não encontrada', () => {
    it('deve lançar NotFoundException quando cidade não existe', async () => {
      // Arrange: Mock retorna resposta vazia
      const emptyResponse: AxiosResponse = {
        data: { results: [] },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(emptyResponse));

      // Act & Assert: Verifica exceção
      await expect(service.getWeatherByCity('CidadeInexistente123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  /**
   * TESTE 3: Timeout na API de geocodificação
   */
  describe('getWeatherByCity - Timeout Geocoding', () => {
    it('deve lançar RequestTimeoutException quando geocoding timeout', async () => {
      // Arrange: Simula erro de timeout
      const timeoutError = new Error('Timeout') as AxiosError;
      timeoutError.code = 'ECONNABORTED';

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        throwError(() => timeoutError),
      );

      // Act & Assert
      await expect(service.getWeatherByCity('São Paulo')).rejects.toThrow(
        RequestTimeoutException,
      );
    });
  });

  /**
   * TESTE 4: Timeout na API de clima
   */
  describe('getWeatherByCity - Timeout Weather API', () => {
    it('deve lançar RequestTimeoutException quando weather API timeout', async () => {
      // Arrange: Geocoding OK, Weather timeout
      const timeoutError = new Error('Timeout') as AxiosError;
      timeoutError.code = 'ECONNABORTED';

      jest.spyOn(httpService, 'get')
        .mockReturnValueOnce(of(mockGeocodingResponse))
        .mockReturnValueOnce(throwError(() => timeoutError));

      // Act & Assert
      await expect(service.getWeatherByCity('São Paulo')).rejects.toThrow(
        RequestTimeoutException,
      );
    });
  });

  /**
   * TESTE 5: Erro genérico na API de geocodificação
   */
  describe('getWeatherByCity - Erro Geocoding API', () => {
    it('deve lançar BadGatewayException quando geocoding API falha', async () => {
      // Arrange: Simula erro genérico
      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        throwError(() => new Error('Network error')),
      );

      // Act & Assert
      await expect(service.getWeatherByCity('São Paulo')).rejects.toThrow(
        BadGatewayException,
      );
    });
  });

  /**
   * TESTE 6: Erro genérico na API de clima
   */
  describe('getWeatherByCity - Erro Weather API', () => {
    it('deve lançar BadGatewayException quando weather API falha', async () => {
      // Arrange: Geocoding OK, Weather falha
      jest.spyOn(httpService, 'get')
        .mockReturnValueOnce(of(mockGeocodingResponse))
        .mockReturnValueOnce(throwError(() => new Error('Network error')));

      // Act & Assert
      await expect(service.getWeatherByCity('São Paulo')).rejects.toThrow(
        BadGatewayException,
      );
    });
  });
});
