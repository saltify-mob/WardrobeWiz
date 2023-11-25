import { fetcher } from '../utils/fetcher';

export const fetchWardrobeData = async () => {
    try {
      const response = await fetcher('/api/clothings/wardrobe');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem('wardrobe_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
