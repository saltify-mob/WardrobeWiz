import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import HeadWearCard from './headwear/HeadWearCard';
import TopsCard from './tops/TopsCard';
import LowerGarmentsCard from './lowerGarments/LowerGarmentsCard';
import { fetcher } from '@/app/utils/fetcher';
import { Clothing } from '@/app/types/ClothingItem';

const WardrobeCard = () => {
  const [wardrobe, setWardrobe] = useState<Clothing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('clothingData');
    if (storedData) {
      setWardrobe(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, []);

  const headWears = wardrobe.filter(cloting => cloting.category === 'headwear');
  const tops = wardrobe.filter((cloting) => cloting.category === "top");
  const lowerGarments = wardrobe.filter(cloting => cloting.category === 'lowerGarment');
  
  return (
    <div className="flex flex-col">
      {isLoading ? (
        <Image
          className="mb-60"
          src="https://media.tenor.com/JBgYqrobdxsAAAAi/loading.gif" // Denna borde vi ändra?
          alt="Loading"
          width={200}
          height={200}
          layout="fixed"
        />
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