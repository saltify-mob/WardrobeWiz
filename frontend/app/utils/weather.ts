// weather.ts
export async function fetchWeather(lat: number, lon: number): Promise<any> { // Replace 'any' with a specific type if possible
    const apiKey = '63520229f6b76bb7ab50efa7b41e2ee5&units=metric';  // Ensure you have this in your .env file
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return await response.json();
}
