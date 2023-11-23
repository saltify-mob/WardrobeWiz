import React from 'react'
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

  return (
    <div className="flex flex-row">
      {props.headwears.map((h, index) => (
        <img height={100} width={200} key={index} src={h.imageUrl}></img>
      ))}
    </div>
  );
}

export default HeadWearCard;