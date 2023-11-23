'use client';
import Image from 'next/image';
import Link from 'next/link';
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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete?')) {
      const response = await fetch(`${HOST_NAME}/api/clothings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setClothes((prev) => prev.filter((clothes) => clothes.id !== id));
      } else {
        alert('Cannot delete');
      }
    }
  };

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
            <button
              className="text-red-500"
              onClick={() => handleDelete(cloth.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <Link href="/clothings/add">Add New</Link>
    </div>
  );
}
