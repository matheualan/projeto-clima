import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherQueryDto } from './dto/weather-query.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';

/**
 * Controller de Previsão do Tempo
 * 
 * @class WeatherController
 * @description Expõe endpoints REST para consulta de dados climáticos
 * 
 * Endpoints disponíveis:
 * - GET /weather?city={cityName} - Busca previsão do tempo por cidade
 * 
 * @example
 * // Requisição:
 * GET /weather?city=São Paulo
 * 
 * // Resposta (200 OK):
 * {
 *   "city": "São Paulo",
 *   "coordinates": {
 *     "latitude": -23.5505,
 *     "longitude": -46.6333
 *   },
 *   "current": {
 *     "temperature": 25.5,
 *     "windSpeed": 12.3,
 *     "humidity": 65,
 *     "weatherCode": 0,
 *     "time": "2024-01-15T14:30:00"
 *   },
 *   "timezone": "America/Sao_Paulo",
 *   "units": {
 *     "temperature": "°C",
 *     "windSpeed": "km/h",
 *     "humidity": "%"
 *   }
 * }
 */
@Controller('weather')
export class WeatherController {
  private readonly logger = new Logger(WeatherController.name);

  constructor(private readonly weatherService: WeatherService) {}

  /**
   * Endpoint para buscar previsão do tempo por cidade
   * 
   * @param {WeatherQueryDto} query - Query parameters (city)
   * @returns {Promise<WeatherResponseDto>} Dados climáticos da cidade
   * 
   * @throws {BadRequestException} Quando parâmetros são inválidos (400)
   * @throws {NotFoundException} Quando cidade não é encontrada (404)
   * @throws {BadGatewayException} Quando API externa falha (502)
   * @throws {RequestTimeoutException} Quando requisição excede timeout (408)
   * 
   * @example
   * // Requisição válida:
   * GET /weather?city=Rio de Janeiro
   * 
   * // Requisição inválida:
   * GET /weather?city=
   * // Retorna 400: "O nome da cidade é obrigatório"
   * 
   * // Cidade não encontrada:
   * GET /weather?city=CidadeInexistente123
   * // Retorna 404: "Cidade não encontrada..."
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async getWeather(
    @Query(
      new ValidationPipe({
        transform: true, // Transforma query params em objeto tipado
        whitelist: true, // Remove propriedades não declaradas no DTO
        forbidNonWhitelisted: false, // Não rejeita propriedades extras
      }),
    )
    query: WeatherQueryDto,
  ): Promise<WeatherResponseDto> {
    this.logger.log(`Requisição recebida para cidade: ${query.city}`);

    // Delega processamento ao service
    const weather = await this.weatherService.getWeatherByCity(query.city);

    this.logger.log(`Resposta enviada com sucesso para cidade: ${query.city}`);

    return weather;
  }

  /**
   * Endpoint de health check (opcional, mas recomendado)
   * 
   * @returns {object} Status do serviço
   * 
   * @example
   * GET /weather/health
   * // Retorna: { status: 'ok', timestamp: '2024-01-15T14:30:00.000Z' }
   */
  @Get('health')
  @HttpCode(HttpStatus.OK)
  healthCheck(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
