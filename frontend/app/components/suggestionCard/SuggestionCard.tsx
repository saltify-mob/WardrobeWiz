import React, { useState, useEffect } from 'react';
import { fetchOutfitData } from '../../hooks/FetchOutfitData';
import Image from 'next/image';

const SuggestionCard = () => {
  const [outfit, setOutfit] = useState({
    headwearUrl: 'https://via.placeholder.com/100?text=Headwear',
    topUrl: 'https://via.placeholder.com/150?text=Top',
    trousersUrl: 'https://via.placeholder.com/120x180?text=Trousers'
  });

  const loadNewOutfit = async () => {
    try {
      const outfitData = await fetchOutfitData();
      console.log('Fetched Outfit Data:', outfitData);
      setOutfit(outfitData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    loadNewOutfit();
  }, []);

  return (
    <div className="full-w flex flex-col items-center bg-white my-8">
      <h2 className="text-2xl font-semibold my-4">{`Today's Outfit`}</h2>
      <div className="flex flex-col items-center mb-6 space-y-4">
        <Image 
          src={outfit.headwearUrl} 
          alt="Headwear" 
          width={100}
          height={100}
          objectFit="cover"
          className="rounded-md"
        />
        <Image 
            src={outfit.topUrl} 
            alt="Top" 
            width={150}
            height={150}
            objectFit="cover"
            className="rounded-md"
        />
        <Image 
            src={outfit.trousersUrl} 
            alt="Trousers" 
            width={120}
            height={180}
            objectFit="cover"
            className="rounded-md"
        />
      </div>
      <button
        onClick={loadNewOutfit}
        className="mt-4 mb-16 bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-800 transition-colors"
      >
        Generate New
      </button>
    </div>
  );
};

export default SuggestionCard;
