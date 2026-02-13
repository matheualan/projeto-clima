import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

/**
 * DTO (Data Transfer Object) para validação da requisição de previsão do tempo
 * 
 * @class WeatherQueryDto
 * @description Valida o parâmetro 'city' recebido na query string da requisição
 * 
 * @example
 * // Requisição válida: GET /weather?city=São Paulo
 * // Requisição inválida: GET /weather?city= (vazia)
 */
export class WeatherQueryDto {
  /**
   * Nome da cidade para buscar a previsão do tempo
   * 
   * @type {string}
   * @decorator IsNotEmpty - Garante que a cidade não está vazia
   * @decorator IsString - Garante que o valor é uma string
   * @decorator MinLength - Cidade deve ter no mínimo 2 caracteres
   * @decorator MaxLength - Cidade deve ter no máximo 100 caracteres
   * 
   * @example "São Paulo"
   * @example "Rio de Janeiro"
   */
  @IsNotEmpty({ message: 'O nome da cidade é obrigatório' })
  @IsString({ message: 'O nome da cidade deve ser um texto' })
  @MinLength(2, { message: 'O nome da cidade deve ter no mínimo 2 caracteres' })
  @MaxLength(100, { message: 'O nome da cidade deve ter no máximo 100 caracteres' })
  city: string;
}
