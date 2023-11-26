import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchOutfitData } from '@/app/hooks/fetchOutfitData';

const SuggestionCard = () => {
  const [outfit, setOutfit] = useState({
    headwearUrl: 'https://via.placeholder.com/100?text=Headwear',
    topUrl: 'https://via.placeholder.com/150?text=Top',
    trousersUrl: 'https://via.placeholder.com/120x180?text=Trousers'
  });

  const loadNewOutfit = async () => {
    try {
      const outfitData = await fetchOutfitData();
      setOutfit(outfitData);
    } catch (error) {
      console.error("Error fetching outfit data:", error);
    }
  };

  useEffect(() => {
    loadNewOutfit();
  }, []);

  return (
    <div className="mx-4 my-4 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <Image src={outfit.headwearUrl} alt="Headwear" width={100} height={100} />
        <Image src={outfit.topUrl} alt="Top" width={150} height={150} />
        <Image src={outfit.trousersUrl} alt="Trousers" width={120} height={180} />
        <button className="mt-4 px-4 py-2 bg-2B8BD4 text-black rounded-lg shadow" onClick={loadNewOutfit}>
          New Outfit
        </button>
      </div>
    </div>
  );
};

export default SuggestionCard;
