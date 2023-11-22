import React from 'react';
import Link from 'next/link';
import { InfoIcon, AddClothesIcon, HomeIcon, WardrobeIcon, StorageIcon } from './icons';

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white p-2 flex justify-between items-center shadow-md">
      <Link href="/tabs/info" className="flex flex-col items-center space-y-1 text-gray-700">
          <InfoIcon />
          <span>Info</span>
      </Link>

      <Link href="/tabs/addclothes" className="flex flex-col items-center space-y-1 text-gray-700">
          <AddClothesIcon />
          <span>Add Clothes</span>
      </Link>

      <Link href="/" className="flex flex-col items-center space-y-1 text-gray-700">
          <HomeIcon />
          <span>Home</span>
      </Link>

      <Link href="/tabs/wardrobe" className="flex flex-col items-center space-y-1 text-gray-700">
          <WardrobeIcon />
          <span>Wardrobe</span>
      </Link>

      <Link href="/tabs/storage" className="flex flex-col items-center space-y-1 text-gray-700">
          <StorageIcon />
          <span>Storage</span>
      </Link>
    </nav>
  );
};

export default BottomNavBar;
