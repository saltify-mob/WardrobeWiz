'use client';

import React from 'react';

import StorageCard from '../components/storage/StorageCard';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';

export default function Storage() {
  return (
  <main className="w-full flex-col items-center justify-between">
    <HamburgerMenu />
    <h1 className='text-2xl font-bold'>My Storage</h1>
    <StorageCard/>
  </main>
  );
}
