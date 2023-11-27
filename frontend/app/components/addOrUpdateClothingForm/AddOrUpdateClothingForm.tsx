'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useWardrobe } from '../../hooks/wardrobeContext';
import { UpdateClothingData } from '@/app/types/UpdateClothingData';
import { useRouter } from 'next/navigation';

interface AddOrUpdateClothingFormProps {
  id?: string;
}

const AddOrUpdateClothingForm: React.FC<AddOrUpdateClothingFormProps> = ({ id }) => {
  const { wardrobe, handleAddClothing, handleUpdateClothing } = useWardrobe();
  const [file, setFile] = useState<Blob | null>(null);
  const [season, setSeason] = useState('winter');
  const [type, setType] = useState('shirt');
  const [category, setCategory] = useState('top');
  const [location, setLocation] = useState('wardrobe');
  const [color, setColor] = useState('red');

  // Placeholder
  const currentDate = new Date().toISOString().split('T')[0];
  const [dateOfPurchase, setDateOfPurchase] = useState(currentDate);
  const [timeLastUsed, setTimeLastUsed] = useState(currentDate);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      const clothingItem = wardrobe.find(item => item.id === id);
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


  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md px-4 py-6">
      <div className="mb-4">
        <label htmlFor="season" className="block text-sm font-medium text-gray-700">Season: </label>
        <select
          id="season"
          required
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category: </label>
        <select
          id="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="headwear">Headwear</option>
          <option value="top">Top</option>
          <option value="lowerGarment">Lower Garment</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type: </label>
        <select
          id="type"
          required
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="shirt">Shirt</option>
          <option value="hoodie">Hoodie</option>
          <option value="sweatShirt">Sweat Shirt</option>
          <option value="t-shirt">T-shirt</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location: </label>
        <select
          id="location"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="wardrobe">Wardrobe</option>
          <option value="storage">Storage</option>
          <option value="storage">Lugage</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color: </label>
        <select
          id="color"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
          <option value="brown">Brown</option>
          <option value="black">Black</option>
          <option value="white">White</option>
        </select>
      </div>

      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:btn btn-secondary file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-4 w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default AddOrUpdateClothingForm;