'use client';

import React from 'react';

import StorageCard from '../components/storage/StorageCard';
import Link from 'next/link';

export default function Storage() {
  return (
    <main>
      <div className="flex flex-col items-center w-full p-3">

    <StorageCard/>
    </div>
    <footer className="bg-neutral py-10 text-center text-sm text-base-100">
      <Link href="https://github.com/saltify-mob/WardrobeWiz" className="text-accent text-base-100 hover:underline">
          © 2023 Saltify™. All Rights Reserved.
      </Link>
    </footer>
  </main>
  );
}
