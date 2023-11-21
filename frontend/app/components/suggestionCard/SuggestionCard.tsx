import React, { useState } from 'react';

// Placeholder images, replace these with real URLs from your API
const placeholderImages = {
  headwear: 'https://via.placeholder.com/150?text=Headwear',
  shirt: 'https://via.placeholder.com/150?text=Shirt',
  pants: 'https://via.placeholder.com/150?text=Pants',
};

const TodaysOutfit = () => {
  const [outfit, setOutfit] = useState({
    headwear: placeholderImages.headwear,
    shirt: placeholderImages.shirt,
    pants: placeholderImages.pants,
  });

  const fetchOutfit = () => {
    // Mock fetching new outfit
    setOutfit({
      headwear: placeholderImages.headwear,
      shirt: placeholderImages.shirt,
      pants: placeholderImages.pants,
    });
  };

  return (
    <div className="flex flex-col items-center bg-white p-36 rounded-lg shadow-lg my-8">
      <h2 className="text-2xl font-semibold my-4">{`Today's Outfit`}</h2>
      <div className="flex flex-col items-center mb-6 space-y-4">
        <img src={outfit.headwear} alt="Headwear" className="w-24 h-24 object-cover" />
        <img src={outfit.shirt} alt="Shirt" className="w-32 h-32 object-cover" />
        <img src={outfit.pants} alt="Pants" className="w-24 h-32 object-cover" />
      </div>
      <button
        onClick={fetchOutfit}
        className="mt-4 mb-16 bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-800 transition-colors"
      >
        Suggest New
      </button>
    </div>
  );

};


export default TodaysOutfit;
