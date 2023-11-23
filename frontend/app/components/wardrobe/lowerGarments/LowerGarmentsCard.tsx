import React, { useRef } from 'react'
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
    lowerGarments: Clothing[]
}
const LowerGarmentsCard = (props: Props) => {
  const sliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const scrollAmount = 100;		
  return (
    <div className="flex flex-row">
      <img
        src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
        className="self-center w-10 h-5 hover:cursor-pointer"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft -= scrollAmount;
        }}
      />
      <div
        className="flex flex-row max-w-md overflow-scroll scroll-smooth"
        dir="ltr"
        ref={sliderRef}
      >
        {props.lowerGarments.map((lowerGarment, index) => (
          <img
            className="scroll-ps-2 snap-x border-solid border-2 border-black m-2"
            height={100}
            width={200}
            key={index}
            src={lowerGarment.imageUrl}
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
    </div>
  );
}

export default LowerGarmentsCard;
