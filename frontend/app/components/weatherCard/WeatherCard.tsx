import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

interface WeatherData {
  name?: string;
  weather?: WeatherCondition[];
  main?: { temp: number };
}

interface ErrorData {
  code: number;
  message: string;
}

interface Coordinates {
  lat: number;
  lng: number;
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
      const data: WeatherData = await response.json();
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
    setLocation((prevState) => ({
      ...prevState,
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
    }));
    fetchWeather(latitude, longitude);
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation((prevState) => ({
      ...prevState,
      error: {
        code: error.code,
        message: error.message,
      },
    }));
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
  },[]);

  const WeatherIcon = ({ code }: { code: string }) => {
    const iconUrl = `http://openweathermap.org/img/wn/${code}.png`;
    return (
      <div className="mx-auto">
          <Image src={iconUrl} alt="Weather icon" />
      </div>
    );
  };

  return (
    <div className="rounded-xl p-36 text-center" style={{ background: 'linear-gradient(180deg, rgba(	135, 206, 235) 0%, rgba(235, 254, 255, 0) 100%)' }}>
      {location.weather ? (
        <div>
          <div className="text-3xl font-bold">{location.weather.main?.temp}°C</div>
          <div className="text-xl">{location.weather.name}</div>
          {location.weather.weather && location.weather.weather.length > 0 && (
            <WeatherIcon code={location.weather.weather[0].icon} />
          )}
        </div>
      ) : location.error ? (
        <div className="text-red-600">{location.error.message}</div>
      ) : (
        <div>Loading weather...</div>
      )}
    </div>
  );
};

export default GeolocationComponent;