'use client';

import React from 'react';
import WardrobeCard from '../components/wardrobe/WardrobeCard';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';

export default function Wardrobe() {
  return (
    <main className="flex flex-col items-center w-full p-4">
      <HamburgerMenu />
      <h1 className="text-2xl font-bold my-4 text-center">My Wardrobe</h1>
      <WardrobeCard />
    </main>
  );
}
