import { fetcher } from '../utils/fetcher';

export const fetchClothingData = async () => {
  try {
    const response = await fetcher('/api/clothings');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    localStorage.setItem('clothingData', JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching clothing data:', error);
    throw error;
  }
};
