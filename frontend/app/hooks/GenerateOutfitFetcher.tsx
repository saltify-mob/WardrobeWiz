import { ClothingItem } from "../types/ClothingItem";
  
  export const fetchOutfitData = async () => {
    try {
      const response = await fetch('https://wardrobewiz-backend.azurewebsites.net/api/clothings/generate');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ClothingItem[] = await response.json();
      localStorage.setItem('OutfitData', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching clothing data:', error);
    }
  };
