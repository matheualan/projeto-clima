import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

/**
 * Módulo de Previsão do Tempo
 * 
 * @class WeatherModule
 * @description Encapsula toda a funcionalidade relacionada a previsão do tempo
 * 
 * Componentes:
 * - WeatherController: Endpoints REST
 * - WeatherService: Lógica de negócio
 * - HttpModule: Cliente HTTP para APIs externas
 * 
 * @example
 * // Importado no AppModule:
 * @Module({
 *   imports: [WeatherModule],
 * })
 * export class AppModule {}
 */
@Module({
  imports: [
    /**
     * HttpModule do NestJS/Axios
     * Fornece o HttpService para fazer requisições HTTP
     * Utiliza RxJS observables internamente
     */
    HttpModule.register({
      timeout: 5000, // Timeout padrão de 5 segundos
      maxRedirects: 5, // Máximo de redirects permitidos
    }),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService], // Exporta para uso em outros módulos, se necessário
})
export class WeatherModule {}
