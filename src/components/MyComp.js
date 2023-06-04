import React, {useState} from 'react';
import Search from './Search';
import {fetchWeatherData, NOMINATIM_URL} from '../api/Api';
import WeatherForecast from "./WeatherForecast";
import WeatherChart from "./WeatherChart";
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import Container from "@mui/material/Container";
import SvgIcon from "@mui/material/SvgIcon";
import {ReactComponent as SplashIcon} from '../asset/sun.svg';
import {mapWeatherCodeToIconStyle} from "./Details";

const MyComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(false);

    let appContent = (
        <Box
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                width: '100%',
                minHeight: '500px',
            }}
        >
            <SvgIcon
                component={SplashIcon}
                inheritViewBox
                sx={{fontSize: {xs: '100px', sm: '120px', md: '140px'}}}
            />
            <Typography
                variant="h4"
                component="h4"
                sx={{
                    fontSize: {xs: '12px', sm: '14px'},
                    color: 'rgba(255,255,255, .85)',
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    margin: '2rem 0',
                    maxWidth: '80%',
                    lineHeight: '22px',
                }}
            >
                Explore real-time weather conditions and a 5-day forecast by simply clicking on the location icon.
                Alternatively, you can also type in the name of any city around the world to get detailed weather
                information. Start your weather exploration now!
            </Typography>
        </Box>
    );

    const handleSearchChange = async (enteredData) => {
        const [latitude, longitude] = enteredData.value.split(' ');
        setName(enteredData.label);
        setLoading(true);

        try {
            const data = await fetchWeatherData(latitude, longitude);
            setWeatherData(data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching weather data:', error);
            setLoading(false);
        }
    };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {
                    const data = await fetchWeatherData(latitude, longitude);
                    setWeatherData(data);

                    const response = await fetch(`${NOMINATIM_URL}&lat=${latitude}&lon=${longitude}`);
                    const locationData = await response.json();
                    setName(locationData.display_name);
                    setLoading(false);
                } catch (error) {
                    console.log('Error fetching weather data or location:', error);
                    setLoading(false);
                }
            }, (error) => {
                console.log('Error fetching location:', error);
                setLoading(false);
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    };

    return (
        <Container
            sx={{
                maxWidth: {xs: '95%', sm: '80%', md: '1100px'},
                width: '100%',
                height: '100%',
                margin: '0 auto',
                padding: '1rem 0 3rem',
                marginBottom: '1rem',
                background: 'linear-gradient(-35deg, #000428 0%, #004e92)',
                borderRadius: {
                    xs: 'none',
                    sm: '0 0 1rem 1rem',
                },
                boxShadow: {
                    xs: 'none',
                    sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
                },
            }}
        >
            <Grid container columnSpacing={2}>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            width: '100%',
                            marginBottom: '1rem',
                        }}
                    >
                        <Button
                            onClick={handleCurrentLocation}
                            variant="outlined"
                            size="small"
                            sx={{
                                color: '#ffffff',
                                borderColor: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#2d95bd',
                                    color: '#000000'
                                }
                            }}
                        >
                            <LocationSearchingIcon sx={{marginRight: '0.5rem'}}/>
                            Use My Location
                        </Button>
                        <Link
                            href="https://github.com/ms7495"
                            target="_blank"
                            underline="none"
                            sx={{display: 'flex'}}
                        >
                            <GitHubIcon
                                sx={{
                                    fontSize: {xs: '25px', sm: '30px', md: '40px'},
                                    color: 'black',
                                    '&:hover': {color: '#2d95bd'},
                                }}
                            />
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="h4" sx={{color: 'white'}}>{name}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', width: '500wh'}}>
                        <Search onSearchChange={handleSearchChange}/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {loading ? (
                        <Typography variant="h4" align="center">
                            Loading...
                        </Typography>
                    ) : weatherData ? (
                        <React.Fragment>
                            <Grid item xs={12} sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                gap: '50px',
                                flexWrap: 'nowrap'
                            }}>
                                <Box sx={{display: 'flex', alignItems: 'center', color: 'white'}}>
                                    {weatherData && mapWeatherCodeToIconStyle(weatherData.current_weather.weathercode, {fontSize: '5rem'})}
                                    <Typography variant="h2">{weatherData.current_weather.temperature} ℃</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <WeatherForecast weatherData={weatherData}/>
                                </Box>
                            </Grid>
                            <Typography variant="h4" component="div" align="center" gutterBottom sx={{color: 'white'}}>
                                The next 24 hours:
                            </Typography>
                            <Grid item xs={12}>
                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <WeatherChart weatherData={weatherData}/>
                                </Box>
                            </Grid>
                        </React.Fragment>
                    ) : appContent}
                </Grid>
            </Grid>
        </Container>
    );
};

export default MyComponent;
