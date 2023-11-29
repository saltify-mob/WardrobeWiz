'use client';

import React, { useEffect, useState } from 'react';
import WardrobeCard from '../components/wardrobe/WardrobeCard';
import { useRouter } from 'next/navigation';
import { useWardrobe } from '../contexts/wardrobeContext';
import { ClothingItem } from '../types/ClothingItem';
import ClothingCard from '../components/clothingCard/ClothingCard';

export default function Wardrobe() {

  const { wardrobe, handleDeleteClothing, handleUpdateClothing } = useWardrobe();
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const [currentSeason, setCurrentSeason] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const storedWeatherData = localStorage.getItem('weatherData');
    if (storedWeatherData) {
      const weatherData = JSON.parse(storedWeatherData);
  
      if (weatherData && weatherData.main) {
        const currentTemp = weatherData.main.temp;
        const season = determineSeason(currentTemp);
        setCurrentSeason(season);
      } else {
        console.log("The structure of weather data is not as expected.");
      }
    } else {
      console.log("No weather data found in local storage.");
    }
  }, []);

  function determineSeason(temp: number): string {
    const currentMonth = new Date().getMonth();

    if (temp >= 25) {
        return "summer";
    } else if (temp >= 10) {
        if (currentMonth >= 0 && currentMonth <= 5) {
            return "spring";
        } else {
            return "autumn";
        }
    } else {
        return "winter";
    }
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
