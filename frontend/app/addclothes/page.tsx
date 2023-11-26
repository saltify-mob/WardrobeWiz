'use client';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';
import { useWardrobe } from '../hooks/wardrobeContext';

export default function AddClothingPage() {
  const [file, setFile] = useState<Blob | null>(null);
  const [season, setSeason] = useState('winter');
  const [type, setType] = useState('shirt');
  const [category, setCategory] = useState('top');
  const [location, setLocation] = useState('wardrobe');
  const [color, setColor] = useState('red');
  const [dateOfPurchase, setDateOfPurchase] = useState('');
  const [timeLastUsed, setTimeLastUsed] = useState('');

  const { handleAddClothing } = useWardrobe();
  const router = useRouter();

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
    <main className="flex flex-col items-center w-full">
      <HamburgerMenu />
      <form onSubmit={handleSubmit} className="w-full max-w-md px-4 py-6">
        <div className="mb-4">
          <label htmlFor="season" className="block text-sm font-medium text-gray-700">Season: </label>
          <select
            id="season"
            required
            value={season}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-4D9DDB focus:ring focus:ring-2B8BD4 focus:ring-opacity-50"
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type: </label>
          <select
            id="type"
            required
            value={type}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-4D9DDB focus:ring focus:ring-2B8BD4 focus:ring-opacity-50"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="shirt">Shirt</option>
            <option value="hoodie">Hoodie</option>
            <option value="sweatShirt">Sweat Shirt</option>
            <option value="t-shirt">T-shirt</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category: </label>
          <select
            id="category"
            required
            value={category}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-4D9DDB focus:ring focus:ring-2B8BD4 focus:ring-opacity-50"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="headwear">Headwear</option>
            <option value="top">Top</option>
            <option value="lowerGarment">Lower Garment</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location: </label>
          <select
            id="location"
            required
            value={location}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-4D9DDB focus:ring focus:ring-2B8BD4 focus:ring-opacity-50"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="wardrobe">Wardrobe</option>
            <option value="storage">Storage</option>
            <option value="luggage">Luggage</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color: </label>
          <select
            id="color"
            required
            value={color}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-4D9DDB focus:ring focus:ring-2B8BD4 focus:ring-opacity-50"
            onChange={(e) => setColor(e.target.value)}
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
        <div className="mb-4">
          <label htmlFor="dateOfPurchase" className="block text-sm font-medium text-gray-700">Date of Purchase: </label>
          <input
            id="dateOfPurchase"
            required
            type="date"
            value={dateOfPurchase}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-4D9DDB focus:ring focus:ring-2B8BD4 focus:ring-opacity-50"
            onChange={(e) => setDateOfPurchase(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="timeLastUsed" className="block text-sm font-medium text-gray-700">Time Last Used: </label>
          <input
            id="timeLastUsed"
            required
            type="date"
            value={timeLastUsed}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-4D9DDB focus:ring focus:ring-2B8BD4 focus:ring-opacity-50"
            onChange={(e) => setTimeLastUsed(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input type="file" className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-4D9DDB file:text-white
            hover:file:bg-2B8BD4" onChange={handleFileChange} />
        </div>
        <button type="submit" className="mt-4 w-full px-4 py-2 bg-4D9DDB text-black font-semibold rounded-lg hover:bg-2B8BD4">
          Submit
        </button>
      </form>
    </main>
  );
  
}
