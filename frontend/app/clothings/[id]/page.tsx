'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/app/utils/fetcher';
import Image from 'next/image';

export default function AddClothingPage({
  params,
}: {
  params: { id: string };
}) {
  const [season, setSeason] = useState('winter');
  const [type, setType] = useState('shirt');
  const [category, setCategory] = useState('top');
  const [location, setLocation] = useState('wardrobe');
  const [color, setColor] = useState('red');
  const [dateOfPurchase, setDateOfPurchase] = useState('');
  const [timeLastUsed, setTimeLastUsed] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetcher(`/api/clothings/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setCategory(res.category);
        setSeason(res.season);
        setType(res.type);
        setLocation(res.location);
        setColor(res.color);
        setDateOfPurchase(res.dateOfPurchase);
        setTimeLastUsed(res.timeLastUsed);
        setImageUrl(res.imageUrl);
      });
  }, [params.id]);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetcher(`/api/clothings/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        category,
        type,
        season,
        color,
        dateOfPurchase,
        timeLastUsed,
        location,
      }),
    });
    router.push('/wardrobe');
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
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
