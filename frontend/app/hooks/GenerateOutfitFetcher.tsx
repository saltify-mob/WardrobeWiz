export const fetchOutfitData = async () => {
  try {
    const response = await fetch('https://wardrobewiz-backend.azurewebsites.net/api/clothings/generate/0bde3294-0feb-41e0-8763-4c6477623f5e');
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
