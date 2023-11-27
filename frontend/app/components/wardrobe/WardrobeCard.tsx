import React, { useEffect, useState } from 'react'

import HeadWearCard from './headwear/HeadWearCard';
import TopsCard from './tops/TopsCard';
import LowerGarmentsCard from './lowerGarments/LowerGarmentsCard';
import { ClothingItem } from '@/app/types/ClothingItem';
import ClothingCard from '../storage/ClothingCard';
import { useWardrobe } from '@/app/hooks/wardrobeContext';
import ClothingCategoryCard from './ClothingCategoryCard';

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
      <ClothingCategoryCard
        clothingItems={headWears}
        onToggleDetail={toggleDetail}
        categoryTitle="Head Garment"
      />
  
      <ClothingCategoryCard
        clothingItems={tops}
        onToggleDetail={toggleDetail}
        categoryTitle="Body Garment"
      />
  
      <ClothingCategoryCard
        clothingItems={lowerGarments}
        onToggleDetail={toggleDetail}
        categoryTitle="Lower Garment"
      />
  
      {/* Existing code for selectedClothing and ClothingCard */}
    </div>
  );
}

export default WardrobeCard;