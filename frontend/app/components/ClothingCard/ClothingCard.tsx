import React from 'react';
import Image from 'next/image';
import { ClothingItem } from '@/app/types/ClothingItem';

interface ClothingCardProps {
  clothing: ClothingItem;
  onClose: () => void;
  onDelete: () => void;
  onSendTo: () => void;
  onUpdate: () => void;
  sendToLabel: string;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ clothing, onClose, onDelete, onSendTo, onUpdate, sendToLabel }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white bg-opacity-90">
      <div className="max-w-md p-4 bg-white shadow-md rounded-md">
        <Image 
          src={clothing.imageUrl}
          alt={clothing.type} 
          layout="responsive"
          width={170}
          height={227}
          objectFit="cover"
        />
        <div className="mt-4">
          <button onClick={onDelete} className="mr-2">Delete</button>
          <button onClick={onSendTo}>{sendToLabel}</button>
          <button onClick={onUpdate}>Update</button>
          <button onClick={onClose} className="absolute top-0 right-0 p-2">X</button>
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;