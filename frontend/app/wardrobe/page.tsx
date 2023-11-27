'use client';

import React from 'react';
import WardrobeCard from '../components/wardrobe/WardrobeCard';

export default function Wardrobe() {
  return (
    <main className="flex flex-col items-center w-full p-10">
    <h1 className="text-2xl font-bold my-4 text-center">My Wardrobe</h1>
      <WardrobeCard />
    </main>
  );
}
