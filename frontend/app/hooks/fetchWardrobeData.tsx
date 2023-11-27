import { fetcher } from '../utils/fetcher';
import { ClothingItem } from '../types/ClothingItem';

export const fetchWardrobeData = async (): Promise<ClothingItem[] | null> => {
    try {
      const response = await fetcher('/api/clothings/wardrobe');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ClothingItem[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
};
