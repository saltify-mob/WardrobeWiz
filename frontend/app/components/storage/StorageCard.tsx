import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetcher } from '@/app/utils/fetcher';

import ClothingCard from './ClothingCard';

interface Clothing {
  id: string;
  category: string;
  type: string;
  season: string;
  color: string;
  dateOfPurchase: string;
  timeLastUsed: string;
  imageUrl: string;
}

const StorageCard: React.FC = () => {
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClothing, setSelectedClothing] = useState<Clothing | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher('/api/clothings/wardrobe');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClothes(data);
      } catch (error) {
        console.error('Error fetching clothing data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    // Implement delete functionality here
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
      <div className="w-96 h-96">
        <div className="grid grid-cols-3 gap-4 h-full">
          {filteredClothes.map((clothing, index) => (
            <div key={index} className="relative">
               <Image
                  src={clothing.imageUrl}
                  alt={clothing.type}
                  width={96}
                  height={96}
                  layout="responsive"
                />
            </div>
          ))}
        </div>
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
