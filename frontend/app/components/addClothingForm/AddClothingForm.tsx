'use client'
import React, { ChangeEvent, useState } from 'react';
import { useWardrobe } from '../../hooks/wardrobeContext'; // Adjust the import path as needed

const AddClothingForm: React.FC = () => {
  const [file, setFile] = useState<Blob | null>(null);
  const [season, setSeason] = useState('winter');
  const [type, setType] = useState('shirt');
  const [category, setCategory] = useState('top');
  const [location, setLocation] = useState('wardrobe');
  const [color, setColor] = useState('red');

    // Placeholder:
    const currentDate = new Date().toISOString().split('T')[0];
    const [dateOfPurchase] = useState(currentDate);
    const [timeLastUsed] = useState(currentDate);

  const { handleAddClothing } = useWardrobe();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    handleAddClothing(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md px-4 py-6">
      {/* Season Selection */}
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

      {/* Category Selection */}
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
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Type Selection */}
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
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Location Selection */}
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
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Color Selection */}
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
          {/* Add more options as needed */}
        </select>
      </div>
{/*
      
      <div className="mb-4">
        <label htmlFor="dateOfPurchase" className="block text-sm font-medium text-gray-700">Date of Purchase: </label>
        <input
          id="dateOfPurchase"
          required
          type="date"
          value={dateOfPurchase}
          onChange={(e) => setDateOfPurchase(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

     
      <div className="mb-4">
        <label htmlFor="timeLastUsed" className="block text-sm font-medium text-gray-700">Time Last Used: </label>
        <input
          id="timeLastUsed"
          required
          type="date"
          value={timeLastUsed}
          onChange={(e) => setTimeLastUsed(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
  */}

      {/* File Input */}
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:btn btn-secondary file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary mt-4 w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default AddClothingForm;
