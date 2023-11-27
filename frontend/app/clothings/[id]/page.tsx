'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/app/utils/fetcher';
import Image from 'next/image';
import { useWardrobe } from '@/app/hooks/wardrobeContext';

export default function AddClothingPage({ params }: { params: { id: string } }) {
  const { wardrobe, handleUpdateClothing } = useWardrobe();
  const router = useRouter();

  const [season, setSeason] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [color, setColor] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Placeholder:
  const currentDate = new Date().toISOString().split('T')[0];
  const [dateOfPurchase] = useState(currentDate);
  const [timeLastUsed] = useState(currentDate);

  useEffect(() => {
    const clothingItem = wardrobe.find(item => item.id === params.id);
    if (clothingItem) {
      setSeason(clothingItem.season || '');
      setType(clothingItem.type || '');
      setCategory(clothingItem.category || '');
      setLocation(clothingItem.location || '');
      setColor(clothingItem.color || '');
      setImageUrl(clothingItem.imageUrl || '');
    }
  }, [params.id, wardrobe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = {
      season,
      type,
      category,
      location,
      color,
      dateOfPurchase,
      timeLastUsed,
    };

    const success = await handleUpdateClothing(params.id, updatedData);
    if (success) {
      router.push('/wardrobe');
    } else {
      console.error('Failed to update clothing item');
    }
  };

  return (
    <main className="w-full flex-col items-center justify-between">
      <form onSubmit={handleSubmit}>
        <Image src={imageUrl} alt="imageUrl" height={100} width={100} />
        <div>
          <label htmlFor="season">Season: </label>
          <select
            id="season"
            required
            value={season}
            placeholder="Enter season"
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
          </select>
        </div>
        <div>
          <label htmlFor="type">Type: </label>
          <select
            id="type"
            required
            value={type}
            placeholder="Enter type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="shirt">Shirt</option>
            <option value="hoodie">Hoodie</option>
            <option value="sweatShirt">Sweat Shirt</option>
            <option value="t-shirt">T-shirt</option>
          </select>
        </div>
        <div>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            required
            value={category}
            placeholder="Enter category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="headwear">Headwear</option>
            <option value="top">Top</option>
            <option value="lowerGarment">Lower Garment</option>
          </select>
        </div>
        <div>
          <label htmlFor="location">Location: </label>
          <select
            id="location"
            required
            value={location}
            placeholder="Enter location"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="wardrobe">Wardrobe</option>
            <option value="storage">Storage</option>
            <option value="luggage">Luggage</option>
          </select>
        </div>
        <div>
          <label htmlFor="color">Color: </label>
          <select
            id="color"
            required
            value={color}
            placeholder="Enter color"
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
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
