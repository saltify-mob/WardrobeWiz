'use client';

import React from 'react';
import WardrobeCard from '../components/wardrobe/WardrobeCard';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';

export default function Wardrobe() {
  return (
    <main className="w-full flex-col items-center justify-between">
      <HamburgerMenu />
      <h1 className='text-2xl font-bold'>My Wardrobe</h1>
      <WardrobeCard />
    </main>
  );
}
