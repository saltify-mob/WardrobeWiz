import React, { useRef } from 'react';
import Image from 'next/image';
import { ClothingItem } from '@/app/types/ClothingItem';

interface Props {
  lowerGarments: ClothingItem[];
}

const LowerGarmentsCard = ({ lowerGarments }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 100;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex items-center">
      {lowerGarments.length > 0 && (
        <button onClick={scrollLeft} className="mr-2">
          <Image src="https://cdn-icons-png.flaticon.com/512/109/109618.png" alt="Left" width={100} height={100} />
        </button>
      )}
      <div ref={sliderRef} className="flex overflow-x-auto no-scrollbar">
        {lowerGarments.map((garment, index) => (
          <div key={index} className="flex-none w-48 mx-2">
            <Image src={garment.imageUrl} alt={garment.name} width={192} height={192} layout="fixed" />
          </div>
        ))}
      </div>
      {lowerGarments.length > 0 && (
        <button onClick={scrollRight} className="ml-2">
          <Image src="https://cdn-icons-png.flaticon.com/512/109/109617.png" alt="Right" width={100} height={100} />
        </button>
      )}
    </div>
  );
}

export default LowerGarmentsCard;
