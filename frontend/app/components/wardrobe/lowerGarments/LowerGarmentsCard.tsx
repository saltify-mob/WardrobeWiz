import { ClothingItem } from '@/app/types/ClothingItem';
import React, { useRef } from 'react';
import Image from 'next/image';

interface Clothing extends ClothingItem {
  category: string;
}

interface Props {
  lowerGarments: Clothing[];
}
const LowerGarmentsCard = (props: Props) => {
  const sliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const scrollAmount = 100;		

  return (
    <section className="flex flex-row">
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
      <div
        className="flex flex-row max-w-md overflow-scroll scroll-smooth"
        dir="ltr"
        ref={sliderRef}
      >
        {props.lowerGarments.map((lowerGarment, index) => (
          <div className="scroll-ps-2 snap-x m-2" key={index}>
            <Image
              src={lowerGarment.imageUrl}
              alt="Lower garment"
              width={150}
              height={100}
              layout="fixed"
            />
          </div>
        ))}
      </div>
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
    </section>
  );
}

export default LowerGarmentsCard;
