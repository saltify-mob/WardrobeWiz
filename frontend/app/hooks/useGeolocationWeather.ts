// useGeolocationWeather.ts
import { useState, useEffect } from 'react';
import { fetchWeather } from '../utils/weather';

interface Location {
    lat: number;
    lng: number;
}

interface WeatherData {
    // Define the structure according to the API response
    [key: string]: any; // Temporary placeholder
}

interface Error {
    message: string;
}

const useGeolocationWeather = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError({ message: 'Geolocation is not supported by your browser' });
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });

            try {
                const weatherData = await fetchWeather(latitude, longitude);
                setWeather(weatherData);
            } catch (error) {
                setError({ message: 'Failed to fetch weather data' });
            }
        }, () => {
            setError({ message: 'Unable to retrieve your location' });
        });
    }, []);

    return { location, weather, error };
};

export default useGeolocationWeather;
