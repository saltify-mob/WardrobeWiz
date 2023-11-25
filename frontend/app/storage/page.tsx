'use client';

import React from 'react';

import BottomNavBar from '../components/navBar/NavBar';
import StorageCard from '../components/storage/StorageCard';

export default function Storage() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-4">
  <div>Storage Page</div>
  <StorageCard/>
  <BottomNavBar />
</main>
  );
}
