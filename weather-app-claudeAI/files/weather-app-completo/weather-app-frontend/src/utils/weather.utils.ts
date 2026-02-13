/**
 * Utilitários para interpretação de dados climáticos
 */

/**
 * Mapa de códigos climáticos da WMO (World Meteorological Organization)
 * Usado pela Open-Meteo API
 * 
 * @see https://open-meteo.com/en/docs
 */
const weatherCodeDescriptions: Record<number, { description: string; icon: string }> = {
  0: { description: 'Céu limpo', icon: '☀️' },
  1: { description: 'Principalmente limpo', icon: '🌤️' },
  2: { description: 'Parcialmente nublado', icon: '⛅' },
  3: { description: 'Nublado', icon: '☁️' },
  45: { description: 'Neblina', icon: '🌫️' },
  48: { description: 'Neblina com geada', icon: '🌫️' },
  51: { description: 'Garoa leve', icon: '🌦️' },
  53: { description: 'Garoa moderada', icon: '🌦️' },
  55: { description: 'Garoa intensa', icon: '🌧️' },
  61: { description: 'Chuva leve', icon: '🌧️' },
  63: { description: 'Chuva moderada', icon: '🌧️' },
  65: { description: 'Chuva forte', icon: '⛈️' },
  71: { description: 'Neve leve', icon: '🌨️' },
  73: { description: 'Neve moderada', icon: '🌨️' },
  75: { description: 'Neve intensa', icon: '❄️' },
  77: { description: 'Granizo', icon: '🧊' },
  80: { description: 'Pancadas leves', icon: '🌦️' },
  81: { description: 'Pancadas moderadas', icon: '🌧️' },
  82: { description: 'Pancadas fortes', icon: '⛈️' },
  85: { description: 'Pancadas de neve leves', icon: '🌨️' },
  86: { description: 'Pancadas de neve fortes', icon: '❄️' },
  95: { description: 'Tempestade', icon: '⛈️' },
  96: { description: 'Tempestade com granizo leve', icon: '⛈️' },
  99: { description: 'Tempestade com granizo forte', icon: '⛈️' },
};

/**
 * Obtém descrição e ícone do código climático
 * 
 * @param {number} code - Código WMO do clima
 * @returns {object} Descrição e ícone
 * 
 * @example
 * const { description, icon } = getWeatherDescription(0);
 * // Retorna: { description: "Céu limpo", icon: "☀️" }
 */
export function getWeatherDescription(code: number): { description: string; icon: string } {
  return (
    weatherCodeDescriptions[code] || {
      description: 'Condição desconhecida',
      icon: '❓',
    }
  );
}

/**
 * Formata data/hora para exibição
 * 
 * @param {string} isoString - Data em formato ISO
 * @returns {string} Data formatada
 * 
 * @example
 * formatDateTime("2024-01-15T14:30:00");
 * // Retorna: "15/01/2024 às 14:30"
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Valida nome de cidade
 * 
 * @param {string} city - Nome da cidade
 * @returns {boolean} true se válido
 */
export function isValidCityName(city: string): boolean {
  const trimmed = city.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}
