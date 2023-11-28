import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchOutfitData } from '@/app/hooks/fetchOutfitData';
import { Button } from '@material-tailwind/react';

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
    <div className="w-full flex flex-col items-center bg-D5E8F6 rounded-lg ">
      <h2 className="text-2xl font-semibold my-4">{`Today's Outfit`}</h2>
      <div className="flex flex-col items-center mb-6 space-y-4">
        <Image 
          src={outfit.headwearUrl} 
          alt="Headwear" 
          width={100}
          height={100}
          objectFit="cover"
          className="rounded-md shadow-2xl"
        />
        <Image 
            src={outfit.topUrl} 
            alt="Top" 
            width={150}
            height={150}
            objectFit="cover"
            className="rounded-md shadow-2xl"
        />
        <Image 
            src={outfit.trousersUrl} 
            alt="Trousers" 
            width={120}
            height={180}
            objectFit="cover"
            className="rounded-md shadow-2xl"
        />
      </div>
      <Button
        onClick={loadNewOutfit}
        className="btn btn-primary mt-4 w-full mx-15 px-24 py-2 bg-primary text-white font-semibold rounded-lg md:w-80 lg:w-80">
        Generate New
      </Button>
    </div>
  );
};

export default SuggestionCard;
