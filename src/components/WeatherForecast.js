import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WindPowerIcon from '@mui/icons-material/WindPower';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import {mapWeatherCodeToDescription, mapWeatherCodeToIcon} from "./Details";

const WeatherForecast = ({weatherData}) => {

    const slicedArray = weatherData.daily.time.slice(0, 5);
    const temperatureData = weatherData.daily.temperature_2m_max.slice(0, 5);
    const windSpeedData = weatherData.daily.windspeed_10m_max.slice(0, 5);
    const weatherCodeData = weatherData.daily.weathercode.slice(0, 5);
    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[date.getDay()];
    };

    return (
        <Card sx={{width: '100%', m: 2, p: 2, color: 'white', backgroundColor: 'transparent'}}>
            <Typography variant="h5" component="div" align="center" gutterBottom sx={{color: 'white'}}>
                Next 5 Days Weather Forecast
            </Typography>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: '30px',
                flexWrap: 'no-wrap'
            }}>
                {slicedArray.map((day, index) => (
                    <Box key={day} sx={{width: '15%', mb: 2, mx: 1, textAlign: 'center'}}>
                        <Typography variant="h6" component="div" gutterBottom sx={{color: 'white'}}>
                            {getDayOfWeek(day)}
                            {weatherCodeData && mapWeatherCodeToIcon(weatherCodeData[index], {fontSize: '2rem'})}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{color: 'white'}}>
                            {day}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{color: 'white'}}>
                            <DeviceThermostatIcon/> {temperatureData && temperatureData[index]}°C
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{color: 'white'}}>
                            <WindPowerIcon/> {windSpeedData && windSpeedData[index]} km/h
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{color: 'white'}}>
                            {weatherCodeData && mapWeatherCodeToDescription(weatherCodeData[index])}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>

    );
};

export default WeatherForecast;
