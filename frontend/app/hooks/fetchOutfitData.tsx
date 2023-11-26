import { fetcher } from '../utils/fetcher';

export const fetchOutfitData = async () => {
  const weatherData = JSON.parse(localStorage.getItem('weatherData') ?? '{}');
  const temp = weatherData?.main?.temp;
  try {
    const response = await fetcher(`/api/clothings/generate?temp=${temp}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return {
      headwearUrl: data.headwear.imageUrl,
      topUrl: data.top.imageUrl,
      trousersUrl: data.lowerGarment.imageUrl,
    };
  } catch (error) {
    console.error('Error fetching outfit data:', error);
    throw error;
  }
};
