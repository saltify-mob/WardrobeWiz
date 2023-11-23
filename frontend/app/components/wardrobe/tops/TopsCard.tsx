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
    tops: Clothing[]
}
const TopsCard = (props: Props) => {
  return (
    <div className='flex flex-row'>{
        props.tops.map((top, index) => (
            <img height={100} width={200} key={index} src={top.imageUrl}></img>
        ))
        }</div>
  )
}

export default TopsCard;
