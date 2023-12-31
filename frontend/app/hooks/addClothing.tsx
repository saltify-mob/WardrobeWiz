import { fetcher } from '../utils/fetcher';
import { ClothingItem } from '../types/ClothingItem';

export const addClothing = async (formData: FormData): Promise<ClothingItem | null> => {
  try {
    const response = await fetcher(`/api/clothings`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newClothingItem: ClothingItem = await response.json();
    console.log('Clothing added successfully');
    return newClothingItem;
  } catch (error) {
    console.error('Error adding clothing:', error);
    alert('An error has occured. Try using an image below 1Mb.');

    return null;
  }
};
