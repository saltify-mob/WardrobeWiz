import { ClothingItem } from '@/app/types/ClothingItem';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  tops: ClothingItem[];
  onToggleDetail: (clothing: ClothingItem) => void;
}

const TopsCard = (props: Props) => {
  const sliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const scrollAmount = 100;
  
  return (
    <section className="flex flex-row items-center justify-center">
      {props.tops.length ? (
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
        {props.tops.map((top, index) => (
          <div className="scroll-ps-2 snap-x m-2" key={index}>
              <Image
                src={top.imageUrl}
                alt="Top garment"
                width={200}
                height={100}
                layout="fixed"
              />
          </div>
        ))}
      </div>
      {props.tops.length ? (
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
  );
}

export default TopsCard;
