import { fetcher } from '../utils/fetcher';

export const deleteClothing = async (clothingId: string) => {
  if (!clothingId) {
    console.error('No clothing ID provided');
    return false;
  }
  try {
    const response = await fetcher(`/api/clothings/${clothingId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Clothing deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting clothing:', error);
    return false;
  }
};
