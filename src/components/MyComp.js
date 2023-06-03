import React, { useState } from 'react';
import Search from './Search';
import { fetchWeatherData } from '../api/Api';
import LastDays from "./LastDays";
import './MyComp.css';
import WeatherForecast from "./WeatherForecast";
import WeatherChart from "./WeatherChart";
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

const MyComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [name, setName] = useState(null);
    const [last, setLast] = useState(null);
    async function fetchData(lat, lon) {
        try {
            const response = await fetch(
                `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true&past_days=7&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
            );

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    const handleSearchChange = async (enteredData) => {
        const [latitude, longitude] = enteredData.value.split(' ');
        setName(enteredData.label);

        try {
            const data = await fetchWeatherData(latitude, longitude);
            const data2 = await fetchData(latitude, longitude);
            setWeatherData(data);
            setLast(data2);
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setName('Current location');

                try {
                    const data = await fetchWeatherData(latitude, longitude);
                    const data2 = await fetchData(latitude, longitude);
                    setWeatherData(data);
                    setLast(data2);
                } catch (error) {
                    console.log('Error fetching weather data:', error);
                }
            }, (error) => {
                console.log('Error fetching location:', error);
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="myComponent">
            <h1>Check Weather</h1>
            <Search onSearchChange={handleSearchChange} />

            <button onClick={handleCurrentLocation}>Use My Location</button>

            {weatherData && (
                <div>
                    <h2>{name}</h2>
                    <h1>{weatherData.current_weather.temperature}</h1>
                    {last && <LastDays weatherData={last} />}
                </div>
            )}

            <div>
                {weatherData && <WeatherForecast weatherData={weatherData} />}
            </div>

            <div>
                {weatherData && <WeatherChart weatherData={weatherData} />}
            </div>
        </div>
    );
};

export default MyComponent;
