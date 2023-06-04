import {AcUnit, BeachAccess, Cloud, CloudOff, CloudQueue, FlashOn, Opacity, Waves, WbSunny} from "@mui/icons-material";
import React from "react";

export const mapWeatherCodeToIconStyle = (code, style = {}) => {
    switch (code) {
        case 0:
            return <WbSunny style={style}/>;
        case 1:
        case 2:
            return <Cloud style={style}/>;
        case 3:
            return <CloudQueue style={style}/>;
        case 45:
        case 48:
            return <CloudOff style={style}/>;
        case 51:
        case 53:
        case 55:
            return <AcUnit style={style}/>;
        case 56:
        case 57:
            return <Opacity style={style}/>;
        case 61:
        case 63:
        case 65:
            return <Waves style={style}/>;
        case 66:
        case 67:
            return <BeachAccess style={style}/>;
        case 71:
        case 73:
        case 75:
            return <Cloud style={style}/>;
        case 77:
            return <CloudQueue style={style}/>;
        case 80:
        case 81:
        case 82:
            return <FlashOn style={style}/>;
        case 85:
        case 86:
            return <CloudOff style={style}/>;
        case 95:
        case 96:
        case 99:
            return <FlashOn style={style}/>;
        default:
            return null;
    }
};

export const mapWeatherCodeToIcon = (code) => {
    switch (code) {
        case 0:
            return <WbSunny/>;
        case 1:
        case 2:
            return <Cloud/>;
        case 3:
            return <CloudQueue/>;
        case 45:
        case 48:
            return <CloudOff/>;
        case 51:
        case 53:
        case 55:
            return <AcUnit/>;
        case 56:
        case 57:
            return <Opacity/>;
        case 61:
        case 63:
        case 65:
            return <Waves/>;
        case 66:
        case 67:
            return <BeachAccess/>;
        case 71:
        case 73:
        case 75:
            return <Cloud/>;
        case 77:
            return <CloudQueue/>;
        case 80:
        case 81:
        case 82:
            return <FlashOn/>;
        case 85:
        case 86:
            return <CloudOff/>;
        case 95:
        case 96:
        case 99:
            return <FlashOn/>;
        default:
            return null;
    }
};

export const mapWeatherCodeToDescription = (code) => {
    switch (code) {
        case 0:
            return 'Clear sky';
        case 1:
        case 2:
        case 3:
            return 'Mainly clear, partly cloudy, and overcast';
        case 45:
        case 48:
            return 'Fog and depositing rime fog';
        case 51:
        case 53:
        case 55:
            return 'Drizzle: Light, moderate, and dense intensity';
        case 56:
        case 57:
            return 'Freezing Drizzle: Light and dense intensity';
        case 61:
        case 63:
        case 65:
            return 'Rain: Slight, moderate and heavy intensity';
        case 66:
        case 67:
            return 'Freezing Rain: Light and heavy intensity';
        case 71:
        case 73:
        case 75:
            return 'Snow fall: Slight, moderate, and heavy intensity';
        case 77:
            return 'Snow grains';
        case 80:
        case 81:
        case 82:
            return 'Rain showers: Slight, moderate, and violent';
        case 85:
        case 86:
            return 'Snow showers slight and heavy';
        case 95:
        case 96:
        case 99:
            return 'Thunderstorm with slight and heavy hail';
        default:
            return 'Weather code not found';
    }
};