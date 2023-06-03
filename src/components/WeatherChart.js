import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const WeatherChart = ({ weatherData }) => {
    const { hourly } = weatherData;

    // Construct the data for the chart
    const chartData = hourly.time.map((time, index) => ({
        time,
        temperature: hourly.temperature_2m[index],
        humidity: hourly.relativehumidity_2m[index],
        windspeed: hourly.windspeed_10m[index],
    }));

    return (
        <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
            <Line type="monotone" dataKey="windspeed" stroke="#ffc658" />
        </LineChart>
    );
};

export default WeatherChart;
