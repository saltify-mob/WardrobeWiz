import React, { useEffect, useState } from 'react'
import HeadWearCard from './headwear/HeadWearCard';
import TopsCard from './tops/TopsCard';
import LowerGarmentsCard from './lowerGarments/LowerGarmentsCard';

interface Clothing {
  id: string;
  category: string;
  type: string;
  season: string;
  color: string;
  dateOfPurchase: string;
  timeLastUsed: string;
  imageUrl: string;
}

const WardrobeCard = () => {

  const [wardrobe, setWardrobe] = useState<Clothing[]>([]);

  useEffect(() => {
    const getWardrobe = async () => {
    try {
      const response = await fetch('https://wardrobewiz-backend.azurewebsites.net/api/clothings/wardrobe/0bde3294-0feb-41e0-8763-4c6477623f5e');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWardrobe(data);
    } catch (error) {
      console.error('Error fetching clothing data:', error);
    }
  };
  getWardrobe(); 
  }, []);
  const headWears = wardrobe.filter(cloting => cloting.category === 'headwear');
  const tops = wardrobe.filter((cloting) => cloting.category === "top");
  const lowerGarments = wardrobe.filter(cloting => cloting.category === 'lowerGarment');
  return (
    <div className="flex flex-col">
      <h1>Head Garment</h1>
      <HeadWearCard headwears={headWears} />
      <h1>Body Garment</h1>
      <TopsCard tops={tops} />
      <h1>Lower Garment</h1>
      <LowerGarmentsCard lowerGarments={lowerGarments} />
    </div>
  );
}

export default WardrobeCard;