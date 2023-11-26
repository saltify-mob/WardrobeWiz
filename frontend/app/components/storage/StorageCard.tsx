import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import ClothingCard from './ClothingCard';
import { Clothing } from '@/app/types/ClothingItem';
import { fetcher } from '@/app/utils/fetcher';
import { fetchWardrobeData } from '@/app/hooks/FetchWardrobeData';

const StorageCard: React.FC = () => {
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClothing, setSelectedClothing] = useState<Clothing | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('wardrobe_data');
    if (storedData) {
      setClothes(JSON.parse(storedData));
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetcher(`/api/clothing/${id}`, { method: 'DELETE' });
      setClothes(clothes.filter(clothing => clothing.id !== id));
      if (selectedClothing?.id === id) {
        setSelectedClothing(null);
      }
      fetchWardrobeData();
    } catch (error) {
      console.error('Error deleting clothing item:', error);
    }
  };

  const handleSendToWardrobe = (clothing: Clothing) => {
    // Implement send to wardrobe functionality here
  };

  const toggleDetail = (clothing: Clothing) => {
    setSelectedClothing(clothing);
  };

  const closeDetail = () => {
    setSelectedClothing(null);
  };

  const filteredClothes = clothes.filter((clothing) =>
    clothing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clothing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clothing.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Clothes..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
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
        <ClothingCard
          clothing={selectedClothing}
          onClose={closeDetail}
          onDelete={() => handleDelete(selectedClothing.id)}
          onSendToWardrobe={() => handleSendToWardrobe(selectedClothing)}
        />
      )}
    </div>
  );
};

export default StorageCard;
