type ClothingItem = {
  id: string;
  type: string;
  season: string;
  color: string;
  dateOfPurchase: string;
  timeLastUsed: string;
  imageUrl: string;
};

export const fetchClothingData = async () => {
  try {
    const response = await fetch('https://wardrobewiz-backend.azurewebsites.net/api/clothings');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ClothingItem[] = await response.json();
    
    // Store the data in local storage
    localStorage.setItem('clothingData', JSON.stringify(data));

    console.log('Fetched Clothing Data:', data);
  } catch (error) {
    console.error('Error fetching clothing data:', error);
  }
};
