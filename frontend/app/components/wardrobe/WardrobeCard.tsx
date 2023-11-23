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
  const [isLoading, setIsLoading] = useState(true);
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
  setIsLoading(false);
  }, []);
  const headWears = wardrobe.filter(cloting => cloting.category === 'headwear');
  const tops = wardrobe.filter((cloting) => cloting.category === "top");
  const lowerGarments = wardrobe.filter(cloting => cloting.category === 'lowerGarment');
  return (
    <div className="flex flex-col">
      {isLoading ? (
        <img
          className="mb-60"
          height={200}
          width={200}
          src="https://media.tenor.com/JBgYqrobdxsAAAAi/loading.gif"
        ></img>
      ) : (
        <>
          <div className="my-5">
            <h1 className="text-center text-lg">Head Garment</h1>
            <HeadWearCard headwears={headWears} />
          </div>
          <div className="my-5">
            <h1 className="text-center text-lg">Body Garment</h1>
            <TopsCard tops={tops} />
          </div>
          <div className="my-5">
            <h1 className="text-center text-lg">Lower Garment</h1>
            <LowerGarmentsCard lowerGarments={lowerGarments} />
          </div>
        </>
      )}
    </div>
  );
}

export default WardrobeCard;