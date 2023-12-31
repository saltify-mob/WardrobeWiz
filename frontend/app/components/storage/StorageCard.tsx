import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import ClothingCard from '../clothingCard/ClothingCard';
import { ClothingItem } from '@/app/types/ClothingItem';
import { useRouter } from 'next/navigation';
import { useWardrobe } from '@/app/contexts/wardrobeContext';

const StorageCard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const { wardrobe, handleDeleteClothing, handleUpdateClothing } = useWardrobe();
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

  const closeDetail = () => {
    setSelectedClothing(null);
  };

  function handleUpdate(id: string): void {
    router.push(`/updateclothing/${id}`);
  }

  const clothesToSendToWardrobe = wardrobe.filter(item => item.season === currentSeason && item.location === "storage");

  const filteredClothes = wardrobe.filter((clothing) =>
    clothing.location === 'storage' &&
    (clothing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clothing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clothing.color.toLowerCase().includes(searchTerm.toLowerCase())||
      clothing.season.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
    <div className="p-4 bg-white shadow bg-white rounded-xl shadow-lg mt-4 w-full md:w-3/4 mx-auto">
    <h1 className="text-xl font-semibold">Consider bringing these clothes up from storage</h1>
    {clothesToSendToWardrobe.length > 0 ? (
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
        {clothesToSendToWardrobe.map(item => (
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
            onClick={() => handleItemClick(clothing)}
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
              sendToLabel={'Wardrobe'}
            />
          </div>
       
      )}
    </div>
    </>
  );
};

export default StorageCard;
