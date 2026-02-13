document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessageDisplay = document.getElementById('error-message');

    searchButton.addEventListener('click', fetchWeatherData);
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            fetchWeatherData();
        }
    });

    async function fetchWeatherData() {
        const city = cityInput.value.trim();
        if (!city) {
            displayError('Por favor, digite o nome de uma cidade.');
            return;
        }

        clearWeatherDisplay();
        errorMessageDisplay.textContent = 'Carregando...';

        try {
            // 1. Geocoding: Converter nome da cidade para latitude e longitude
            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=pt&format=json`
            );

            if (!geoResponse.ok) {
                throw new Error(`Erro ao buscar coordenadas: ${geoResponse.statusText}`);
            }

            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                displayError('Cidade não encontrada. Verifique o nome e tente novamente.');
                return;
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // 2. Obter dados do clima usando as coordenadas
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );

            if (!weatherResponse.ok) {
                throw new Error(`Erro ao buscar dados do clima: ${weatherResponse.statusText}`);
            }

            const weatherData = await weatherResponse.json();

            if (!weatherData.current_weather) {
                displayError('Não foi possível obter os dados do clima para esta cidade.');
                return;
            }

            const temperature = weatherData.current_weather.temperature;
            const weatherCode = weatherData.current_weather.weathercode;
            const weatherDescription = getWeatherDescription(weatherCode);

            cityNameDisplay.textContent = `${name}, ${country}`;
            temperatureDisplay.textContent = `${temperature}°C`;
            descriptionDisplay.textContent = weatherDescription;
            errorMessageDisplay.textContent = '';

        } catch (error) {
            console.error('Erro:', error);
            displayError(`Ocorreu um erro: ${error.message}`);
        }
    }

    function getWeatherDescription(code) {
        switch (code) {
            case 0: return 'Céu limpo';
            case 1: return 'Principalmente limpo';
            case 2: return 'Parcialmente nublado';
            case 3: return 'Nublado';
            case 45: return 'Nevoeiro';
            case 48: return 'Nevoeiro depositante';
            case 51: return 'Chuvisco leve';
            case 53: return 'Chuvisco moderado';
            case 55: return 'Chuvisco denso';
            case 61: return 'Chuva leve';
            case 63: return 'Chuva moderada';
            case 65: return 'Chuva forte';
            case 71: return 'Neve leve';
            case 73: return 'Neve moderada';
            case 75: return 'Neve forte';
            case 80: return 'Pancadas de chuva leves';
            case 81: return 'Pancadas de chuva moderadas';
            case 82: return 'Pancadas de chuva fortes';
            case 95: return 'Trovoada';
            default: return 'Condição desconhecida';
        }
    }

    function displayError(message) {
        errorMessageDisplay.textContent = message;
        clearWeatherDisplay();
    }

    function clearWeatherDisplay() {
        cityNameDisplay.textContent = '';
        temperatureDisplay.textContent = '';
        descriptionDisplay.textContent = '';
    }
});
