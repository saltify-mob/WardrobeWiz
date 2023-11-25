'use client';

import React from 'react';
import BottomNavBar from '../components/navBar/NavBar';
import WardrobeCard from '../components/wardrobe/WardrobeCard';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';

export default function Wardrobe() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <h1 className='text-2xl font-bold'>My Wardrobe</h1>
      <HamburgerMenu />
      <WardrobeCard />
      <BottomNavBar />
    </main>
  );
}