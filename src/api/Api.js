const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
export const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse?format=json';

const GEO_API_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
};

export async function fetchWeatherData(lat, lon) {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max`
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