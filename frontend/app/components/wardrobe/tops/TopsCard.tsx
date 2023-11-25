import React, { useRef, useState } from 'react';

interface Clothing {
  id: string;
  category: string;
  type: string;
  season: string;
  color: string;
  dateOfPurchase: string;
  timeLastUsed: string;
  imageUrl: string;
}

interface Props {
  tops: Clothing[];
}

const TopsCard = (props: Props) => {
  const sliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const scrollAmount = 100;

  return (
    <section className="flex flex-row">
<button
        
        className="self-center btn btn-circle btn-neutral"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft -= scrollAmount;
        }}
        >❮</button>
      <article
        className="flex flex-row max-w-md overflow-hidden scroll-smooth"
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
      <button
        className="self-center btn btn-circle btn-neutral"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft += scrollAmount;
        }}
      >❯</button>
    </section>
  );
}

export default TopsCard;
