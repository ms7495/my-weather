import React from 'react';
import './LastDays.css'; // make sure the path is correct

const LastDays = ({ weatherData }) => {
    const { hourly } = weatherData;

    const last7Days = hourly.time.slice(-7);
    const temperatureData = hourly.temperature_2m.slice(-7);
    const humidityData = hourly.relativehumidity_2m.slice(-7);
    const windSpeedData = hourly.windspeed_10m.slice(-7);

    return (
        <div className="lastDays">
            <h2>Last 7 Days Weather Forecast</h2>
            {last7Days.map((day, index) => (
                <div key={day} className="day">
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

export default LastDays;
