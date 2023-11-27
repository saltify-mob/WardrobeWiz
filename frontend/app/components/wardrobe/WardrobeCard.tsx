import React, { useEffect, useState } from 'react'

import HeadWearCard from './headwear/HeadWearCard';
import TopsCard from './tops/TopsCard';
import LowerGarmentsCard from './lowerGarments/LowerGarmentsCard';
import { ClothingItem } from '@/app/types/ClothingItem';
import ClothingCard from '../storage/ClothingCard';
import { useWardrobe } from '@/app/hooks/wardrobeContext';

const WardrobeCard = () => {
  const { wardrobe, handleDeleteClothing } = useWardrobe();
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await handleDeleteClothing(id);
      if (selectedClothing?.id === id) {
        setSelectedClothing(null);
      }
    } catch (error) {
      console.error('Error deleting clothing item:', error);
    }
  };

  const handleSendToStorage = (clothing: ClothingItem) => {
    // Implement send to storage functionality here
  };

  const toggleDetail = (clothing: ClothingItem) => {
    setSelectedClothing(clothing);
  };

  const closeDetail = () => {
    setSelectedClothing(null);
  };

  const headWears = wardrobe.filter(clothing => clothing.category === 'headwear' && clothing.location === "wardrobe");
  const tops = wardrobe.filter((clothing) => clothing.category === "top" && clothing.location === "wardrobe");
  const lowerGarments = wardrobe.filter(clothing => clothing.category === 'lowerGarment' && clothing.location === "wardrobe");

  return (
    <div className="w-full flex-col items-center justify-between">
      <div className="w-full flex-col items-center justify-between">
        <h1 className="text-center text-lg">Head Garment</h1>
        <HeadWearCard headwears={headWears} onToggleDetail={toggleDetail} />
      </div>
      <div className="w-full flex-col items-center justify-between">
        <h1 className="text-center text-lg">Body Garment</h1>
        <TopsCard tops={tops} onToggleDetail={toggleDetail} />
      </div>

      <div className="w-full flex-col items-center justify-between">
        <h1 className="text-center text-lg">Lower Garment</h1>
        <LowerGarmentsCard lowerGarments={lowerGarments} onToggleDetail={toggleDetail} />
      </div>

      {selectedClothing && (
        <ClothingCard
          clothing={selectedClothing}
          onClose={closeDetail}
          onDelete={() => handleDelete(selectedClothing.id)}
          onSendTo={() => handleSendToStorage(selectedClothing)}
          sendToLabel='Send to Storage'
        />
      )}
    </div>
  );
}

export default WardrobeCard;