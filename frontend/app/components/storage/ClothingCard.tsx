import React from 'react';
import Image from 'next/image';
import { ClothingItem } from '@/app/types/ClothingItem';

interface ClothingCardProps {
  clothing: ClothingItem;
  onClose: () => void;
  onDelete: () => void;
  onSendToWardrobe: () => void;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ clothing, onClose, onDelete, onSendToWardrobe }) => {
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
        <div className="mt-4 flex justify-between">
          <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
          <button onClick={onSendToWardrobe} className="bg-green-500 text-white px-4 py-2 rounded-md">Send to Wardrobe</button>
          <button onClick={onClose} className="absolute top-0 right-0 p-2 text-xl">X</button>
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;
