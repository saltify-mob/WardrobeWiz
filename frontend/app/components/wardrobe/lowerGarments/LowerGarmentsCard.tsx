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
    lowerGarments: Clothing[]
}
const LowerGarmentsCard = (props: Props) => {
  return (
    <div className='flex flex-row'>{
        props.lowerGarments.map((lowerGarment, index) => (
            <img height={100} width={200} key={index} src={lowerGarment.imageUrl}></img>
        ))
        }</div>
  )
}

export default LowerGarmentsCard;
