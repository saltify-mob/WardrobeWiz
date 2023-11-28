'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useWardrobe } from '../../contexts/wardrobeContext';
import { UpdateClothingData } from '@/app/types/UpdateClothingData';
import { useRouter } from 'next/navigation';

interface ClothingFormProps {
  id?: string;
}

const ClothingForm: React.FC<ClothingFormProps> = ({ id }) => {
  const { wardrobe, handleAddClothing, handleUpdateClothing } = useWardrobe();
  const [file, setFile] = useState<Blob | null>(null);
  const [season, setSeason] = useState('winter');
  const [type, setType] = useState('shirt');
  const [category, setCategory] = useState('top');
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
    if (value === 'headwear') {
      setType('beanie');
    } else if (value === 'top') {
      setType('shirt');
    } else if (value === 'lowerGarment') {
      setType('shorts');
    }
    setCategory(value);
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
    <form onSubmit={handleSubmit} className="w-full max-w-md px-4 py-6">

      <div className="mb-4">
        <label
          htmlFor="season"
          className="block text-sm font-medium text-gray-700"
        >
          Season:{' '}
        </label>
        <div className="flex space-x-2">
          {['winter', 'spring', 'summer', 'autumn'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeason(s)}
              className={`${
                season === s ? 'bg-accent text-secondary-content' : 'bg-gray-300 text-secondary-content'
              } py-2 px-4 rounded-full focus:outline-none`}
            >
              {s}
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
          {['headwear', 'top', 'lowerGarment'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleChangeCategory(c)}
              className={`${
                category === c ? 'bg-accent text-secondary-content' : 'bg-gray-300 text-secondary-content'
              } py-2 px-4 rounded-full focus:outline-none`}
            >
              {c}
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
          {category === 'top' && ['shirt', 'hoodie', 'sweatShirt', 't-shirt'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`${
                type === t ? 'bg-accent text-secondary-content' : 'bg-gray-300 text-secondary-content'
              } py-2 px-4 rounded-full focus:outline-none`}
            >
              {t}
            </button>
          ))}
          {category === 'lowerGarment' && ['shorts', 'sweatPants', 'trousers'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`${
                type === t ? 'bg-accent text-secondary-content' : 'bg-gray-300 text-secondary-content'
              } py-2 px-4 rounded-full focus:outline-none`}
            >
              {t}
            </button>
          ))}
          {category === 'headwear' && ['beanie', 'hat'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`${
                type === t ? 'bg-accent text-secondary-content' : 'bg-gray-300 text-secondary-content'
              } py-2 px-4 rounded-full focus:outline-none`}
            >
              {t}
            </button>
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
          {['wardrobe', 'storage', 'lugage'].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocation(l)}
              className={`${
                location === l ? 'bg-accent text-secondary-content' : 'bg-gray-300 text-secondary-content'
              } py-2 px-4 rounded-full focus:outline-none`}
            >
              {l}
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
            : `h-8 w-8 ${
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
          className="block w-full text-sm text-gray-500 file:btn btn-accent file:rounded-full file:border-0 file:text-sm file:font-normal file:text-secondary-content"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-4 w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default ClothingForm;

