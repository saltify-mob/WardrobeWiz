'use client';

import React from 'react';

import StorageCard from '../components/storage/StorageCard';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';

export default function Storage() {
  return (
    <main className="w-full flex flex-col items-center p-4">
      <HamburgerMenu />
      <h1 className='text-2xl font-bold my-4'>My Storage</h1>
      <StorageCard />
    </main>
  );
}
