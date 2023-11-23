
import React from 'react';

interface ClothingDetailProps {
  clothing: {
    id: string;
    category: string;
    type: string;
    season: string;
    color: string;
    dateOfPurchase: string;
    timeLastUsed: string;
    imageUrl: string;
  };
  onClose: () => void;
  onDelete: () => void;
  onSendToWardrobe: () => void;
}

const ClothingDetail: React.FC<ClothingDetailProps> = ({ clothing, onClose, onDelete, onSendToWardrobe }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90">
      <div className="max-w-md p-4 bg-white shadow-md rounded-md">
        <img src={clothing.imageUrl} alt={clothing.type} className="w-full h-auto" />
        <div className="mt-4">
          <button onClick={onDelete} className="mr-2">Delete</button>
          <button onClick={onSendToWardrobe}>Send to Wardrobe</button>
          <button onClick={onClose} className="absolute top-0 right-0 p-2">X</button>
        </div>
      </div>
    </div>
  );
};

export default ClothingDetail;
