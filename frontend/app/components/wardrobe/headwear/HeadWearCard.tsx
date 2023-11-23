import React, { useRef } from 'react';

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

interface Props{
    headwears: Clothing[]
}

const HeadWearCard = (props: Props) => {
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
      <div
        className="flex flex-row max-w-xl overflow-scroll scroll-smooth"
        dir="ltr"
        ref={sliderRef}
      >
        {props.headwears.map((h, index) => (
          <img
            className="scroll-ps-2 snap-x m-2"
            height={50}
            width={100}
            key={index}
            src={h.imageUrl}
          ></img>
        ))}
      </div>
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

export default HeadWearCard;