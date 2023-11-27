import React, { useRef } from 'react';
import Image from 'next/image';
import { ClothingItem } from '@/app/types/ClothingItem';
import { Carousel, IconButton } from '@material-tailwind/react';
import Link from 'next/link';

interface Props {
  clothingItems: ClothingItem[];
  onToggleDetail: (clothing: ClothingItem) => void;
  categoryTitle: string;
}

const ClothingCategoryCard = ({ clothingItems, onToggleDetail, categoryTitle }: Props) => {

  return (
    <div className='flex flex-row items-center justify-center'>
    <Carousel className="w-1/3"
    navigation={({ setActiveIndex, activeIndex, length }) => (
      <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
        {new Array(length).fill("").map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
              activeIndex === i ? "w-8 h-2 bg-black" : "w-4 bg-black"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    )}
     prevArrow={({ handlePrev }) => (
      <IconButton
        variant="text"
        color="white"
        size="lg"
        onClick={handlePrev}
        className="!absolute top-2/4 left-4 -translate-y-2/4 bg-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </IconButton>
       )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 right-4 -translate-y-2/4 bg-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}>
      {clothingItems.map((top, index) => (
        <Link href={`/updateclothing/${top.id}`}>
           <Image
           width={1000}
           height={1050}
           src={top.imageUrl}
           alt="image"
           className="w-full"
         />
         </Link>
      ))} 
    </Carousel>
    </div>
  );
}

export default ClothingCategoryCard;
