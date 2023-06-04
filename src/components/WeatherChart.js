import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

const WeatherChart = ({weatherData}) => {
    const currentTime = new Date();

    const currentIndex = weatherData.hourly.time.findIndex((time) => new Date(time) > currentTime);

    const chartData = [];
    for (let i = currentIndex; i < currentIndex + 24; i++) {
        const hourlyTime = new Date(weatherData.hourly.time[i]);
        const formattedTime = `${hourlyTime.getHours()}:00`; // Format the time to display only hours

        chartData.push({
            time: formattedTime,
            temperature: weatherData.hourly.temperature_2m[i],
            humidity: weatherData.hourly.relativehumidity_2m[i],
            windspeed: weatherData.hourly.windspeed_10m[i],
        });
    }

    return (
        <div style={{width: '100%', maxWidth: '600px', margin: '0 auto'}}>
            {weatherData && (
                <LineChart width={600} height={400} data={chartData}
                           margin={{top: 20, right: 30, left: 20, bottom: 20}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="time" tickFormatter={(value) => value.split(':')[0]}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="temperature" stroke="red" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="humidity" stroke="lightgreen"/>
                    <Line type="monotone" dataKey="windspeed" stroke="yellow"/>
                </LineChart>
            )}
        </div>
    );
};

export default WeatherChart;
