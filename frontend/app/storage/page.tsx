'use client';

import React from 'react';

import StorageCard from '../components/storage/StorageCard';
import Link from 'next/link';

export default function Storage() {
  return (
    <main>
      <div className="flex flex-col items-center w-full p-3 pt-10">
        <StorageCard />
      </div>
    </main>
  );
}
