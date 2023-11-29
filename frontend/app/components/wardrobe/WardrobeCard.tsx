import React, { useState } from 'react';

import { ClothingItem } from '@/app/types/ClothingItem';
import ClothingCard from '../clothingCard/ClothingCard';
import ClothingCategoryCard from './ClothingCategoryCard';
import { useRouter } from 'next/navigation';
import { useWardrobe } from '@/app/contexts/wardrobeContext';

const WardrobeCard = () => {
  const { wardrobe, handleDeleteClothing, handleUpdateClothing } = useWardrobe();
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const router = useRouter();

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

  const handleSendToStorage = async (clothing: ClothingItem) => {
    const updatedData = { ...clothing, location: 'storage' };
    const success = await handleUpdateClothing(clothing.id, updatedData);
    if (success) {
      console.log('Item sent to storage');
      setSelectedClothing(null);
    } else {
      console.error('Failed to send clothing item to storage');
    }
  };

  const toggleDetail = (clothing: ClothingItem) => {
    setSelectedClothing(clothing);
  };

  const closeDetail = () => {
    setSelectedClothing(null);
  };

  function handleUpdate(id: string): void {
    router.push(`/updateclothing/${id}`);
  }

  const headWears = wardrobe.filter(clothing => clothing.category === 'headwear' && clothing.location === "wardrobe");
  const tops = wardrobe.filter((clothing) => clothing.category === "top" && clothing.location === "wardrobe");
  const lowerGarments = wardrobe.filter(clothing => clothing.category === 'lowerGarment' && clothing.location === "wardrobe");

  const renderCategoryCard = (clothingItems: ClothingItem[], categoryTitle: string) => {
    return clothingItems.length > 0 ? (
      <ClothingCategoryCard
        clothingItems={clothingItems}
        onToggleDetail={toggleDetail}
        categoryTitle={categoryTitle}
      />
    ) : (
      <div className='flex flex-col items-center justify-center bg-opacity-100 backdrop-blur-md bg-white rounded-xl shadow-lg overflow-hidden my-4 p-4 mx-auto max-w-md max-h-xl'>
        <h2 className="text-2xl font-bold mb-4">{categoryTitle}</h2>
        <p className="text-center my-4">No items in this category</p>
      </div>
    );
  };

  return (
    <div className="w-full flex-col items-center justify-between">
      {renderCategoryCard(headWears, "Head Garment")}
      {renderCategoryCard(tops, "Body Garment")}
      {renderCategoryCard(lowerGarments, "Lower Garment")}

      {selectedClothing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <ClothingCard
            clothing={selectedClothing}
            onClose={closeDetail}
            onDelete={() => handleDelete(selectedClothing.id)}
            onSendTo={() => handleSendToStorage(selectedClothing)}
            onUpdate={() => handleUpdate(selectedClothing.id)}
            sendToLabel="Storage"
          />
        </div>
      )}
    </div>

  );
}

export default WardrobeCard;
