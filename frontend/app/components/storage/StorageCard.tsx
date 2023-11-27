import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import ClothingCard from '../ClothingCard/ClothingCard';
import { ClothingItem } from '@/app/types/ClothingItem';
import { useWardrobe } from '@/app/hooks/wardrobeContext';
import { useRouter } from 'next/navigation';

const StorageCard: React.FC = () => {
  const [localWardrobe, setLocalWardrobe] = useState<ClothingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const { wardrobe, handleDeleteClothing, handleUpdateClothing } = useWardrobe();
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

  const handleSendToWardrobe = async (clothing: ClothingItem) => {
    const updatedData = { ...clothing, location: 'wardrobe' };
    const success = await handleUpdateClothing(clothing.id, updatedData);
    if (success) {
      console.log('Item sent to wardrobe');
      setSelectedClothing(null);
    } else {
      console.error('Failed to send clothing item to wardrobe');
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

  const filteredClothes = localWardrobe.filter((clothing) =>
    clothing.location === 'storage' &&
    (clothing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clothing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clothing.color.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <input
        type="text"
        placeholder="Search Clothes..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
      />
      <div className="grid grid-cols-3 gap-4">
        {filteredClothes.map((clothing, index) => (
          <div
            key={index}
            className="relative cursor-pointer group shadow-md"
            onClick={() => toggleDetail(clothing)}
          >
            <div className="w-full h-0 pt-[100%] relative rounded-md border border-gray-200 overflow-hidden">
              <Image
                src={clothing.imageUrl}
                alt={clothing.type}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
      {selectedClothing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

            <ClothingCard
              clothing={selectedClothing}
              onClose={closeDetail}
              onDelete={() => handleDelete(selectedClothing.id)}
              onSendTo={() => handleSendToWardrobe(selectedClothing)}
              onUpdate={() => handleUpdate(selectedClothing.id)}
              sendToLabel='Send to Wardrobe'
            />
          </div>
       
      )}
    </div>
  );
};

export default StorageCard;
