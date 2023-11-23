'use client';

import React from 'react';
import BottomNavBar from '../../components/navBar/NavBar';
import WardrobeCard from '../../components/wardrobe/WardrobeCard';

export default function Wardrobe() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div>Wardrobe Page</div>
      <WardrobeCard />
      <BottomNavBar />
    </main>
  );
}