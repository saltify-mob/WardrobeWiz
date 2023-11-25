import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import HeadWearCard from './headwear/HeadWearCard';
import TopsCard from './tops/TopsCard';
import LowerGarmentsCard from './lowerGarments/LowerGarmentsCard';
import { Clothing } from '@/app/types/ClothingItem';

const WardrobeCard = () => {
  const [wardrobe, setWardrobe] = useState<Clothing[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('wardrobe_data');
    if (storedData) {
      setWardrobe(JSON.parse(storedData));
    }
  }, []);

  const headWears = wardrobe.filter(cloting => cloting.category === 'headwear');
  const tops = wardrobe.filter((cloting) => cloting.category === "top");
  const lowerGarments = wardrobe.filter(cloting => cloting.category === 'lowerGarment');

  return (
    <div className="w-full flex-col items-center justify-between">
      <div className="w-full flex-col items-center justify-between">
        <h1 className="text-center text-lg">Head Garment</h1>
        <HeadWearCard headwears={headWears} />
      </div>
      <div className="w-full flex-col items-center justify-between">
        <h1 className="text-center text-lg">Body Garment</h1>
        <TopsCard tops={tops} />
      </div>
      <div className="w-full flex-col items-center justify-between">
        <h1 className="text-center text-lg">Lower Garment</h1>
        <LowerGarmentsCard lowerGarments={lowerGarments} />
      </div>
    </div>
  );
}

export default WardrobeCard;