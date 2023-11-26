import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import ClothingCard from './ClothingCard';
import { ClothingItem } from '@/app/types/ClothingItem';
import { useWardrobe } from '@/app/hooks/wardrobeContext';

const StorageCard: React.FC = () => {
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const { wardrobe, handleDeleteClothing } = useWardrobe();

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

  const handleSendToWardrobe = (clothing: ClothingItem) => {
    // Implement send to wardrobe functionality here
  };

  const toggleDetail = (clothing: ClothingItem) => {
    setSelectedClothing(clothing);
  };

  const closeDetail = () => {
    setSelectedClothing(null);
  };

  const filteredClothes = wardrobe.filter((clothing) =>
    clothing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clothing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clothing.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative p-4">
      <input
        type="text"
        placeholder="Search Clothes..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full px-3 py-2 border rounded-md"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredClothes.map((clothing, index) => (
          <div key={index} className="relative cursor-pointer" onClick={() => toggleDetail(clothing)}>
            <Image
              src={clothing.imageUrl}
              alt={clothing.type}
              width={96}
              height={96}
              layout="fixed"
            />
          </div>
        ))}
      </div>
      {selectedClothing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <ClothingCard
            clothing={selectedClothing}
            onClose={closeDetail}
            onDelete={() => handleDelete(selectedClothing.id)}
            onSendToWardrobe={() => handleSendToWardrobe(selectedClothing)}
          />
        </div>
      )}
    </div>
  );
};

export default StorageCard;