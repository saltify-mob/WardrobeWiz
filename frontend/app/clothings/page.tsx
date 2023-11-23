'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const HOST_NAME = 'https://wardrobewiz-backend.azurewebsites.net';

export type Clothes = {
  id: string;
  season: string;
  category: string;
  type: string;
  color: string;
  imageUrl: string;
};

export default function ClothingsPage() {
  const [clothes, setClothes] = useState<Clothes[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetch(`${HOST_NAME}/api/clothings`)
      .then((res) => res.json())
      .then((res) => setClothes(res));
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2">
        {clothes.map((cloth) => (
          <div key={cloth.id}>
            <p>Type: {cloth.type}</p>
            <p>Category: {cloth.category}</p>
            <p>Season: {cloth.season}</p>
            <p>Color: {cloth.color}</p>
            <Image
              src={cloth.imageUrl}
              alt={cloth.id}
              height={300}
              width={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
}