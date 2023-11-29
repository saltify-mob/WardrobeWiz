'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useWardrobe } from '../../contexts/wardrobeContext';
import { UpdateClothingData } from '@/app/types/UpdateClothingData';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';

// Define mapping objects
const seasonDisplayNames: Record<string, string> = {
  winter: 'Winter',
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn',
};

const categoryDisplayNames: Record<string, string> = {
  headwear: 'Headwear',
  top: 'Top',
  lowerGarment: 'Lower Garments',
};

const typeDisplayNames: Record<string, Record<string, string>> = {
  top: {
    shirt: 'Shirt',
    hoodie: 'Hoodie',
    sweatShirt: 'Sweatshirt',
    't-shirt': 'T-Shirt',
  },
  lowerGarment: {
    shorts: 'Shorts',
    sweatPants: 'Sweatpants',
    trousers: 'Trousers',
  },
  headwear: {
    beanie: 'Beanie',
    hat: 'Hat',
  },
};

const locationDisplayNames: Record<string, string> = {
  wardrobe: 'Wardrobe',
  storage: 'Storage',
  luggage: 'Luggage',
};

interface ClothingFormProps {
  id?: string;
}

const ClothingForm: React.FC<ClothingFormProps> = ({ id }) => {
  const { wardrobe, handleAddClothing, handleUpdateClothing } = useWardrobe();
  const [file, setFile] = useState<Blob | null>(null);
  const [season, setSeason] = useState('winter');
  const [category, setCategory] = useState('top');
  const [type, setType] = useState('shirt'); // Initialize with a default type
  const [location, setLocation] = useState('wardrobe');
  const [color, setColor] = useState('red');
  const currentDate = new Date().toISOString().split('T')[0];
  const [dateOfPurchase, setDateOfPurchase] = useState(currentDate);
  const [timeLastUsed, setTimeLastUsed] = useState(currentDate);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      const clothingItem = wardrobe.find((item) => item.id === id);
      if (clothingItem) {
        setSeason(clothingItem.season);
        setType(clothingItem.type);
        setCategory(clothingItem.category);
        setLocation(clothingItem.location);
        setColor(clothingItem.color);
        setDateOfPurchase(clothingItem.dateOfPurchase);
        setTimeLastUsed(clothingItem.timeLastUsed);
      }
    }
  }, [id, wardrobe]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      const updateData: UpdateClothingData = {
        season,
        type,
        category,
        location,
        color,
        dateOfPurchase,
        timeLastUsed,
      };

      await handleUpdateClothing(id, updateData);
      router.push('/wardrobe');
    } else {
      const formData = new FormData();
      formData.append('season', season);
      formData.append('type', type);
      formData.append('category', category);
      formData.append('color', color);
      formData.append('location', location);
      formData.append('dateOfPurchase', dateOfPurchase);
      formData.append('timeLastUsed', timeLastUsed);
      if (file) {
        formData.append('image', file);
      }

      await handleAddClothing(formData);
      router.push('/wardrobe');
    }
  };

  function handleChangeCategory(value: string): void {
    setCategory(value);
    // Set a default type when the category changes
    setType(Object.keys(typeDisplayNames[value])[0]);
  }

  const colors = [
    'blue',
    'red',
    'yellow',
    'green',
    'orange',
    'pink',
    'purple',
    'brown',
    'black',
    'white',
  ];

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="w-full max-w-m px-1 py-6">

        <div className="mb-4">
          <label
            htmlFor="season"
            className="block text-sm font-medium text-gray-700"
          >
            Season:{' '}
          </label>
          <div className="flex space-x-2">
            {Object.keys(seasonDisplayNames).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeason(s)}
                className={`${
                  season === s
                    ? 'bg-accent text-secondary-content'
                    : 'bg-gray-300 text-secondary-content'
                } py-2 px-3 rounded-full focus:outline-none`}
              >
                {seasonDisplayNames[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category:{' '}
          </label>
          <div className="flex space-x-2">
            {Object.keys(categoryDisplayNames).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleChangeCategory(c)}
                className={`${
                  category === c
                    ? 'bg-accent text-secondary-content'
                    : 'bg-gray-300 text-secondary-content'
                } py-2 px-3 rounded-full focus:outline-none`}
              >
                {categoryDisplayNames[c]}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type:{' '}
          </label>
          <div className="flex space-x-2">
            {Object.keys(typeDisplayNames[category]).map((t) => (
              <div key={t} className=" px-0">
                <button
                  type="button"
                  onClick={() => setType(t)}
                  className={`truncate ${
                    type === t
                      ? 'bg-accent text-secondary-content'
                      : 'bg-gray-300 text-secondary-content'
                  } py-2 px-2 rounded-full focus:outline-none`}
                >
                  {typeDisplayNames[category][t]}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location:{' '}
          </label>
          <div className="flex space-x-2">
            {Object.keys(locationDisplayNames).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocation(l)}
                className={`${
                  location === l
                    ? 'bg-accent text-secondary-content'
                    : 'bg-gray-300 text-secondary-content'
                } py-2 px-2 rounded-full focus:outline-none`}
              >
                {locationDisplayNames[l]}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color:{' '}
          </label>
          <div className="flex flex-wrap space-x-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`rounded-full m-1 focus:outline-none ${
                  color === c
                    ? `h-11 w-11 ${
                        c === 'black'
                          ? 'bg-primary-content text-white'
                          : c === 'white'
                          ? 'bg-base-100 text-black'
                          : `bg-${c}-500 text-white`
                      }`
                    : `h-7 w-7 ${
                        c === 'black'
                          ? 'bg-primary-content text-white opacity-100'
                          : c === 'white'
                          ? 'bg-base-100 text-black opacity-100'
                          : `bg-${c}-500 text-white opacity-100`
                      }`
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 
                       file:bg-primary-content file:btn btn-accent file:rounded-full file:border-0 file:text-sm file:font-normal file:text-secondary-content "
          />
        </div>

        <Button
          type="submit"
          className="btn w-full mx-15 px-24 py-2 bg-teal-900 text-white font-semibold rounded-lg md:w-100 lg:w-100"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ClothingForm;
