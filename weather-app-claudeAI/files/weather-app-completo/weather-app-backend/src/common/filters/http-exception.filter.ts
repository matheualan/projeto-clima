import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Interface para padronização de respostas de erro
 */
interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error?: string;
}

/**
 * Filtro global de exceções HTTP
 * 
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 * @description Captura todas as exceções HTTP da aplicação e retorna
 * uma resposta padronizada e amigável para o cliente
 * 
 * @example
 * // Exceção capturada automaticamente:
 * throw new NotFoundException('Cidade não encontrada');
 * 
 * // Resposta padronizada:
 * {
 *   statusCode: 404,
 *   timestamp: "2024-01-15T14:30:00.000Z",
 *   path: "/weather?city=CidadeInvalida",
 *   message: "Cidade não encontrada",
 *   error: "Not Found"
 * }
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * Captura e formata exceções HTTP
   * 
   * @param {HttpException} exception - Exceção capturada
   * @param {ArgumentsHost} host - Contexto da requisição
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Extrai a mensagem da exceção (pode ser string ou objeto)
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || exception.message;

    // Monta resposta padronizada
    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: Array.isArray(message) ? message.join(', ') : message,
      error: HttpStatus[status],
    };

    // Loga o erro para debug (não expõe ao cliente)
    this.logger.error(
      `HTTP ${status} Error: ${errorResponse.message}`,
      exception.stack,
    );

    // Retorna resposta formatada
    response.status(status).json(errorResponse);
  }
}
