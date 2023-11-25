import React, { useRef } from 'react';
import Image from 'next/image';

import { Clothing } from '@/app/types/ClothingItem';

interface Props {
    headwears: Clothing[]
}

const HeadWearCard = (props: Props) => {
  const sliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const scrollAmount = 100;	

  return (
    <section>
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
        className="flex flex-row max-w-xl overflow-scroll scroll-smooth"
        dir="ltr"
        ref={sliderRef}
      >
        {props.headwears.map((h, index) => (
          <div className="scroll-ps-2 snap-x m-2" key={index}>
            <Image
              src={h.imageUrl}
              alt="Picture of head wear"
              width={100}
              height={50}
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

export default HeadWearCard;