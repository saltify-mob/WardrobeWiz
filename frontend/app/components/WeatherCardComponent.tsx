import React, { useState, useEffect } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface WeatherData {
  name?: string;
  weather?: { main: string }[];
  main?: { temp: number };
}

interface ErrorData {
  code: number;
  message: string;
}

interface LocationState {
  coordinates?: Coordinates;
  weather?: WeatherData;
  error?: ErrorData;
}

const GeolocationComponent: React.FC = () => {
  const [location, setLocation] = useState<LocationState>({});

  const fetchWeather = async (lat: number, lon: number) => {
    const apiKey = '63520229f6b76bb7ab50efa7b41e2ee5&units=metric'; // needs to be changed
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLocation((prevState) => ({
        ...prevState,
        weather: data,
      }));
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const onSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setLocation({
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
    });
    fetchWeather(latitude, longitude);
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      });
      return;
    }

    const watcher = navigator.geolocation.watchPosition(onSuccess, onError);

    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  });

  return (
    <div>
      {location.coordinates ? (
        <div>
          {location.weather ? (
            <div>
              {location.weather.name && <p>City: {location.weather.name}</p>}
              {location.weather.weather && location.weather.weather.length > 0 ? (
                <p>Weather: {location.weather.weather[0].main}</p>
              ) : <p>Weather data not available.</p>}
              {location.weather.main && location.weather.main.temp !== undefined ? (
                <p>Temperature: {location.weather.main.temp}°C</p>
              ) : <p>Temperature data not available.</p>}
            </div>
          ) : <p>Loading weather...</p>}
        </div>
      ) : location.error ? (
        <p>Error: {location.error.message}</p>
      ) : (
        <p>Waiting for location...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
