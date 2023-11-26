import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import HeadWearCard from './headwear/HeadWearCard';
import TopsCard from './tops/TopsCard';
import LowerGarmentsCard from './lowerGarments/LowerGarmentsCard';
import { ClothingItem } from '@/app/types/ClothingItem';

const WardrobeCard = () => {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('wardrobe_data');
    if (storedData) {
      setWardrobe(JSON.parse(storedData));
    }
  }, []);

  const headWears = wardrobe.filter(clothing => clothing.category === 'headwear');
  const tops = wardrobe.filter((clothing) => clothing.category === "top");
  const lowerGarments = wardrobe.filter(clothing => clothing.category === 'lowerGarment');

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mb-4">
        <h2 className="text-lg font-semibold text-center mb-2">Head Garment</h2>
        <HeadWearCard headwears={headWears} />
      </div>
      <div className="w-full mb-4">
        <h2 className="text-lg font-semibold text-center mb-2">Body Garment</h2>
        <TopsCard tops={tops} />
      </div>
      <div className="w-full mb-4">
        <h2 className="text-lg font-semibold text-center mb-2">Lower Garment</h2>
        <LowerGarmentsCard lowerGarments={lowerGarments} />
      </div>
    </div>
  );
}

export default WardrobeCard;