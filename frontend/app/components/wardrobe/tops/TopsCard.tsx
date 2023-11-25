import { ClothingItem } from '@/app/types/ClothingItem';
import React, { useRef } from 'react';

interface Clothing extends ClothingItem {
  category: string;
}

interface Props {
  tops: Clothing[];
}

const TopsCard = (props: Props) => {
  const sliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const scrollAmount = 100;
  
  return (
    <section className="flex flex-row">
      <img
        src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
        className="self-center w-10 h-5 hover:cursor-pointer"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft -= scrollAmount;
        }}
      />
      <article
        className="flex flex-row max-w-md overflow-scroll scroll-smooth"
        dir="ltr"
        ref={sliderRef}
      >
        {props.tops.map((top, index) => (
          <img
            className="scroll-ps-2 snap-x m-2"
            height={100}
            width={200}
            key={index}
            src={top.imageUrl}
          ></img>
        ))}
      </article>
      <img
        src="https://cdn-icons-png.flaticon.com/512/109/109617.png"
        className="self-center w-10 h-5 hover:cursor-pointer"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft += scrollAmount;
        }}
      />
    </section>
  );
}

export default TopsCard;
