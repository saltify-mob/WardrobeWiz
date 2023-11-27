import React, { useEffect, useState } from 'react'

import { ClothingItem } from '@/app/types/ClothingItem';
import ClothingCard from '../ClothingCard/ClothingCard';
import { useWardrobe } from '@/app/hooks/wardrobeContext';
import ClothingCategoryCard from './ClothingCategoryCard';
import { useRouter } from 'next/navigation';

const WardrobeCard = () => {
  const [localWardrobe, setLocalWardrobe] = useState<ClothingItem[]>([]);
  const { wardrobe, handleDeleteClothing, handleUpdateClothing } = useWardrobe();
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedWardrobe = localStorage.getItem('wardrobe_data');
    if (storedWardrobe) {
      setLocalWardrobe(JSON.parse(storedWardrobe));
    } else {
      
    }
  }, []);

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

  const headWears = localWardrobe.filter(clothing => clothing.category === 'headwear' && clothing.location === "wardrobe");
  const tops = localWardrobe.filter((clothing) => clothing.category === "top" && clothing.location === "wardrobe");
  const lowerGarments = localWardrobe.filter(clothing => clothing.category === 'lowerGarment' && clothing.location === "wardrobe");

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

      {selectedClothing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <ClothingCard
            clothing={selectedClothing}
            onClose={closeDetail}
            onDelete={() => handleDelete(selectedClothing.id)}
            onSendTo={() => handleSendToStorage(selectedClothing)}
            onUpdate={() => handleUpdate(selectedClothing.id)}
            sendToLabel='Send to Storage'
          />
        </div>
      )}
    </div>

  );
}

export default WardrobeCard;
