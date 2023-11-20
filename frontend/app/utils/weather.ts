// weather.ts
export async function fetchWeather(lat: number, lon: number): Promise<any> {
    const apiKey = '63520229f6b76bb7ab50efa7b41e2ee5&units=metric';  // have this in .env file?
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return await response.json();
}
