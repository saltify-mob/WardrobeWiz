'use client';

import React, { useState } from 'react';
import WardrobeCard from '../components/wardrobe/WardrobeCard';
import { useRouter } from 'next/navigation';
import { useWardrobe } from '../contexts/wardrobeContext';
import { ClothingItem } from '../types/ClothingItem';
import ClothingCard from '../components/clothingCard/ClothingCard';

export default function Wardrobe() {

  const { wardrobe, handleDeleteClothing, handleUpdateClothing } = useWardrobe();
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);

  const router = useRouter();

  function getSeasonFromCoords(latitude: number) {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const isNorthernHemisphere = latitude >= 0;

    return (isNorthernHemisphere) ?
      ((month >= 2 && month <= 4) ? 'spring' :
        (month >= 5 && month <= 7) ? 'summer' :
          (month >= 8 && month <= 10) ? 'autumn' : 'winter') :
      ((month >= 2 && month <= 4) ? 'autumn' :
        (month >= 5 && month <= 7) ? 'winter' :
          (month >= 8 && month <= 10) ? 'spring' : 'summer');
  }

  function getCurrentSeasonFromLocalStorage() {
    if (typeof window !== "undefined") {
      const weatherDataString = localStorage.getItem('weatherData');
      if (weatherDataString) {
        try {
          const weatherData = JSON.parse(weatherDataString);

          if (weatherData && weatherData.coord && typeof weatherData.coord.lat === 'number') {
            const latitude = weatherData.coord.lat;
            return getSeasonFromCoords(latitude);
          }
        } catch (error) {
          console.error('Error parsing weatherData from local storage:', error);
        }
      }
    }
    return null;
  }

  const handleItemClick = (item: ClothingItem) => {
    setSelectedClothing(item);
  };

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

  const closeDetail = () => {
    setSelectedClothing(null);
  };

  function handleUpdate(id: string): void {
    router.push(`/updateclothing/${id}`);
  }

  const currentSeason = getCurrentSeasonFromLocalStorage();
  const clothesToSendToStorage = wardrobe.filter(item => item.season !== currentSeason && item.location === "wardrobe");

  return (
    <main className="flex flex-col items-center w-full p-10">
       <div className="p-4 bg-white shadow bg-white rounded-xl shadow-lg mt-4 w-full md:w-3/4 mx-auto">
    <h1 className="text-xl font-semibold">Consider storing these clothes</h1>
    {clothesToSendToStorage.length > 0 ? (
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
        {clothesToSendToStorage.map(item => (
          <div key={item.id} className='card bg-gray-100 rounded-lg p-2 shadow hover:shadow-md transition duration-300 cursor-pointer' onClick={() => handleItemClick(item)}>
            <img src={item.imageUrl} alt={`${item.type}`} className="w-full h-20 object-cover rounded-md" />
            <div className="text-center mt-1">
              <h3 className="text-sm">{item.color} {item.type}</h3>
              <p className="text-xs text-gray-600">{item.season}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>All out-of-season items are already in storage.</p>
    )}
  </div>
      {
        selectedClothing && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ClothingCard
              clothing={selectedClothing}
              onClose={closeDetail}
              onDelete={() => handleDelete(selectedClothing.id)}
              onSendTo={() => handleSendToStorage(selectedClothing)}
              onUpdate={() => handleUpdate(selectedClothing.id)}
              sendToLabel={'Storage'}
            />
          </div>
        )
      }
      <WardrobeCard />
    </main>
  );
}
