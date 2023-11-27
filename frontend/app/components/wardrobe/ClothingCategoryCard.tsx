import React, { useRef } from 'react';
import Image from 'next/image';
import { ClothingItem } from '@/app/types/ClothingItem';

interface Props {
  clothingItems: ClothingItem[];
  onToggleDetail: (clothing: ClothingItem) => void;
  categoryTitle: string;
}

const ClothingCategoryCard = ({ clothingItems, onToggleDetail, categoryTitle }: Props) => {
  const sliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const scrollAmount = 100;

  return (
    <div className="w-full flex-col items-center justify-between">
      <h1 className="text-center text-lg">{categoryTitle}</h1>
      <section className="flex flex-row items-center justify-center">
      {clothingItems.length ? (
        <div className="self-center w-10 h-5 hover:cursor-pointer" onClick={() => {
          const container = sliderRef.current;
          if (container) {
            container.scrollLeft -= scrollAmount;
          }
        }}>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
            alt="Left arrow"
            width={20}
            height={20}
            layout="fixed"
          />
        </div>
      ) : (<></>)}

        <div
          className="flex flex-row max-w-md overflow-scroll scroll-smooth"
          dir="ltr"
          ref={sliderRef}
        >
          {clothingItems.map((item, index) => (
            <div 
              className="scroll-ps-2 snap-x m-2" 
              key={index}
              onClick={() => onToggleDetail(item)}
            >
              <Image
                src={item.imageUrl}
                alt={item.type}
                width={200}
                height={100}
                layout="fixed"
              />
            </div>
          ))}
        </div>

        {clothingItems.length ? (
        <div className="self-center w-10 h-5 hover:cursor-pointer" onClick={() => {
          const container = sliderRef.current;
          if (container) {
            container.scrollLeft += scrollAmount;
          }
        }}>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/109/109617.png"
            alt="Right arrow"
            width={20}
            height={20}
            layout="fixed"
          />
        </div>
      ) : (<></>)}
      </section>
    </div>
  );
}

export default ClothingCategoryCard;
