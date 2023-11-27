'use client';

import React from 'react';

import StorageCard from '../components/storage/StorageCard';

export default function Storage() {
  return (
    <main className="flex flex-col items-center w-full">
    <h1 className="text-2xl font-bold my-4 text-center">My Storage</h1>
    <StorageCard/>
  </main>
  );
}
