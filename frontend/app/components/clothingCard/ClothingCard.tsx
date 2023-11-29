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
    <div className="flex items-center justify-center bg-white bg-opacity-90 h-screen w-screen">
      <div ref={cardRef as React.MutableRefObject<HTMLDivElement>} className="w-5/6 sm:w-5/6 md:max-w-md p-4 bg-white shadow-md rounded-md">
              <Button onClick={onDelete} className="btn btn-error mt-1 w-full mx-15 px-18 py-2 bg-error text-white font-semibold rounded-lg md:w-20 lg:w-20 md:mx-3 lg:mx-3">Delete</Button>
        <Image
          src={clothing.imageUrl}
          alt={clothing.type}
          layout="responsive"
          width={170}
          height={227}
          objectFit="cover"
        />
          <div className='flex-col lg:flex-row'>
          <Button onClick={onSendTo} className="btn mt-4 w-full mx-15 px-20 py-2 bg-neutral text-white font-semibold rounded-lg md:w-20 lg:w-20 md:mx-6 lg:mx-6">{sendToLabel}</Button>
          <Button onClick={onUpdate} className="btn  mt-4 w-full mx-15 px-20 py-2 bg-teal-900 text-white  font-semibold rounded-lg md:w-20 lg:w-20 md:mx-3 lg:mx-3">Update</Button>
          </div>
      </div>
    </div>
  );
};

export default ClothingCard;
