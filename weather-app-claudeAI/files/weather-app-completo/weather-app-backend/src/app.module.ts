import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

/**
 * Módulo raiz da aplicação
 * 
 * @class AppModule
 * @description Ponto de entrada da aplicação NestJS
 * 
 * Responsabilidades:
 * - Configuração de variáveis de ambiente
 * - Importação de módulos de features
 * - Configurações globais
 */
@Module({
  imports: [
    /**
     * ConfigModule - Gerenciamento de variáveis de ambiente
     * 
     * Carrega automaticamente o arquivo .env na raiz do projeto
     * isGlobal: true - Disponibiliza ConfigService em toda a aplicação
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    /**
     * WeatherModule - Feature de previsão do tempo
     * Contém controllers, services e toda lógica relacionada
     */
    WeatherModule,
  ],
})
export class AppModule {}
