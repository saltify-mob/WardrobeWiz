import { fetcher } from '../utils/fetcher';
import { ClothingItem } from '../types/ClothingItem';
import { UpdateClothingData } from '../types/UpdateClothingData';

export const updateClothing = async (id: string, updateData: UpdateClothingData): Promise<ClothingItem | null> => {
  try {
    const response = await fetcher(`/api/clothings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const updatedClothingItem: ClothingItem = await response.json();
    console.log('Clothing updated successfully');
    return updatedClothingItem;
  } catch (error) {
    console.error('Error updating clothing:', error);
    return null;
  }
};
