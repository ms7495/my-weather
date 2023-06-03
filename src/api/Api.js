
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const GEO_API_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
};
export async function fetchWeatherData(lat, lon) {
    try {
        const response = await fetch(
            `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchCities(input) {
    try {
        const response = await fetch(
            `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
            GEO_API_OPTIONS
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return;
    }
}