import React, { useState, useEffect } from 'react';
import { fetchOutfitData } from '../../hooks/GenerateOutfitFetcher';

const TodaysOutfit = () => {
  const [outfit, setOutfit] = useState({
    headwearUrl: 'https://via.placeholder.com/150?text=Headwear',
    topUrl: 'https://via.placeholder.com/150?text=Top',
    trousersUrl: 'https://via.placeholder.com/150?text=Trousers',
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
    loadNewOutfit(); // Fetch data when the component mounts
  }, []);

  return (
    <div className="flex flex-col items-center bg-white p-36 rounded-lg shadow-lg my-8">
      <h2 className="text-2xl font-semibold my-4">{`Today's Outfit`}</h2>
      <div className="flex flex-col items-center mb-6 space-y-4">
        <img src={outfit.headwearUrl} alt="Headwear" className="w-24 h-24 object-cover" />
        <img src={outfit.topUrl} alt="Top" className="w-32 h-32 object-cover" />
        <img src={outfit.trousersUrl} alt="Trousers" className="w-24 h-32 object-cover" />
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

export default TodaysOutfit;
