'use client';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/app/utils/fetcher';

export default function AddClothingPage() {
  const [file, setFile] = useState<Blob | null>(null);
  const [season, setSeason] = useState('winter');
  const [type, setType] = useState('shirt');
  const [category, setCategory] = useState('top');
  const [color, setColor] = useState('red');
  const [dateOfPurchase, setDateOfPurchase] = useState('');
  const [timeLastUsed, setTimeLastUsed] = useState('');

  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleAddClothing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('season', season);
    formData.append('type', type);
    formData.append('category', category);
    formData.append('color', color);
    formData.append('dateOfPurchase', dateOfPurchase);
    formData.append('timeLastUsed', timeLastUsed);
    if (file) {
      formData.append('image', file);
    }

    await fetcher(`/api/clothings`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => router.replace('/clothings'));
  };

  return (
    <form onSubmit={handleAddClothing}>
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
          <option value="jacket">Jacket</option>
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
      <div>
        <label htmlFor="dateOfPurchase">Date of Purchase: </label>
        <input
          id="dateOfPurchase"
          required
          type="date"
          value={dateOfPurchase}
          placeholder="Enter date of purchase"
          onChange={(e) => setDateOfPurchase(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="timeLastUsed">Time Last Used: </label>
        <input
          id="timeLastUsed"
          required
          type="date"
          value={timeLastUsed}
          placeholder="Enter time last used"
          onChange={(e) => setTimeLastUsed(e.target.value)}
        />
      </div>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
