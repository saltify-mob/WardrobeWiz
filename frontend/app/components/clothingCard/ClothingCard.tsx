import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ClothingItem } from '@/app/types/ClothingItem';
import { Button } from '@material-tailwind/react';

interface ClothingCardProps {
  clothing: ClothingItem;
  onClose: () => void;
  onDelete: () => void;
  onSendTo: () => void;
  onUpdate: () => void;
  sendToLabel: string;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ clothing, onClose, onDelete, onSendTo, onUpdate, sendToLabel }) => {

  const cardRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cardRef, onClose]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white bg-opacity-90">
      <div ref={cardRef as React.MutableRefObject<HTMLDivElement>} className="max-w-md p-4 bg-white shadow-md rounded-md">
        <Image 
          src={clothing.imageUrl}
          alt={clothing.type} 
          layout="responsive"
          width={170}
          height={227}
          objectFit="cover"
        />
        <div className="mt-4">
          <div className='flex justify-center'>
          <Button onClick={onDelete} className="mr-2 bg-red-600 p-2 hover:bg-red-700">Delete</Button>
          <Button onClick={onSendTo} className='bg-secondary mr-2 p-2'>{sendToLabel}</Button>
          <Button onClick={onUpdate} className='bg-primary p-2'>Update</Button>
          </div>
          <button onClick={onClose} className="absolute top-0 right-0 p-2">X</button>
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;
