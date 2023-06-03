import React from 'react';
import './WeatherForecast.css'; // make sure the path is correct

const WeatherForecast = ({ weatherData }) => {
    const { hourly } = weatherData;

    const next7Days = hourly.time.slice(0, 7);
    const temperatureData = hourly.temperature_2m.slice(0, 7);
    const humidityData = hourly.relativehumidity_2m.slice(0, 7);
    const windSpeedData = hourly.windspeed_10m.slice(0, 7);

    return (
        <div className="weatherForecast">
            <h2>Next 7 Days Weather Forecast</h2>
            {next7Days.map((day, index) => (
                <div key={day} className="forecastDay">
                    <h3>Day {index + 1}</h3>
                    <p>Date: {day}</p>
                    <p>Temperature: {temperatureData[index]}°C</p>
                    <p>Humidity: {humidityData[index]}%</p>
                    <p>Wind Speed: {windSpeedData[index]} km/h</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherForecast;
