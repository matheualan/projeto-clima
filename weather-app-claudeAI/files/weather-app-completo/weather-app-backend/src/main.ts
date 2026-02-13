import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

/**
 * Função de inicialização da aplicação
 * 
 * @async
 * @function bootstrap
 * @description Configura e inicia o servidor NestJS
 * 
 * Configurações aplicadas:
 * - CORS para permitir requisições do frontend
 * - Validation Pipe global para validação automática de DTOs
 * - Exception Filter global para padronização de erros
 * - Logger customizado
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Cria instância da aplicação NestJS
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Obtém serviço de configuração para ler variáveis de ambiente
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);
  const corsOrigins = configService
    .get<string>('CORS_ORIGINS', 'http://localhost:3000')
    .split(',');

  /**
   * Configuração de CORS (Cross-Origin Resource Sharing)
   * Permite que o frontend faça requisições para o backend
   */
  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  /**
   * ValidationPipe Global
   * 
   * Valida automaticamente todos os DTOs que usam decorators de class-validator
   * - transform: true - Converte tipos automaticamente (ex: "25" → 25)
   * - whitelist: true - Remove propriedades não declaradas nos DTOs
   * - forbidNonWhitelisted: true - Retorna erro se houver props extras
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false, // Permite props extras (flexível para query params)
      transformOptions: {
        enableImplicitConversion: true, // Conversão automática de tipos
      },
    }),
  );

  /**
   * Exception Filter Global
   * 
   * Captura todas as exceções HTTP e retorna respostas padronizadas
   * Melhora a experiência do desenvolvedor frontend
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  /**
   * Prefixo global de API (opcional)
   * Útil para versionamento: /api/v1/weather
   */
  // app.setGlobalPrefix('api/v1');

  // Inicia o servidor
  await app.listen(port);

  logger.log(`🚀 Servidor rodando em: http://localhost:${port}`);
  logger.log(`📡 CORS habilitado para: ${corsOrigins.join(', ')}`);
  logger.log(`🌤️  Endpoint disponível: http://localhost:${port}/weather?city=SaoPaulo`);
  logger.log(`💚 Health check: http://localhost:${port}/weather/health`);
}

// Inicia a aplicação
bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('❌ Erro ao iniciar aplicação:', error);
  process.exit(1);
});
