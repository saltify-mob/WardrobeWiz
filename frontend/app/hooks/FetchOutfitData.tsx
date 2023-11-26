import { fetcher } from '../utils/fetcher';

export const fetchOutfitData = async () => {
  try {
    const response = await fetcher('/api/clothings/generate');
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
