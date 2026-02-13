import React from 'react';
import { WeatherData } from '../types/weather.types';
import { getWeatherDescription, formatDateTime } from '../utils/weather.utils';

/**
 * Props do componente WeatherCard
 */
interface WeatherCardProps {
  data: WeatherData;
}

/**
 * Componente para exibir dados climáticos
 * 
 * @component
 * @description Card bonito e responsivo com todas as informações climáticas
 * 
 * @example
 * <WeatherCard data={weatherData} />
 */
export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { description, icon } = getWeatherDescription(data.current.weatherCode);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">{data.city}</h2>
        <p className="text-primary-100 text-sm">
          {formatDateTime(data.current.time)}
        </p>
      </div>

      {/* Conteúdo principal */}
      <div className="p-8">
        {/* Temperatura principal */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="text-7xl mb-2">{icon}</div>
            <div className="text-6xl font-bold text-gray-800">
              {data.current.temperature.toFixed(1)}
              <span className="text-3xl text-gray-500">{data.units.temperature}</span>
            </div>
            <p className="text-xl text-gray-600 mt-2">{description}</p>
          </div>
        </div>

        {/* Métricas secundárias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Umidade */}
          <MetricCard
            icon="💧"
            label="Umidade"
            value={`${data.current.humidity}${data.units.humidity}`}
            color="blue"
          />

          {/* Vento */}
          <MetricCard
            icon="💨"
            label="Velocidade do Vento"
            value={`${data.current.windSpeed.toFixed(1)} ${data.units.windSpeed}`}
            color="cyan"
          />
        </div>

        {/* Coordenadas (informação adicional) */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            📍 Coordenadas: {data.coordinates.latitude.toFixed(4)}°,{' '}
            {data.coordinates.longitude.toFixed(4)}°
          </p>
          <p className="text-sm text-gray-500 text-center mt-1">
            🌍 Fuso horário: {data.timezone}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente auxiliar para exibir métricas individuais
 */
interface MetricCardProps {
  icon: string;
  label: string;
  value: string;
  color: 'blue' | 'cyan';
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    cyan: 'bg-cyan-50 border-cyan-200',
  };

  return (
    <div className={`${colorClasses[color]} border-2 rounded-xl p-4`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};
