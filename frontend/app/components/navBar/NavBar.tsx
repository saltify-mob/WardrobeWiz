import React from 'react';
import { InfoIcon, AddClothesIcon, HomeIcon, WardrobeIcon, StorageIcon } from './icons';

    const BottomNavBar = () => {
      return (
        <nav className="fixed bottom-0 inset-x-0 bg-white p-2 flex justify-between items-center shadow-md">
          <button className="flex flex-col items-center space-y-1 text-gray-700">
            <InfoIcon />
            <span>Info</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-700">
            <AddClothesIcon />
            <span>Add Clothes</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-700">
            <HomeIcon />
            <span>Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-700">
            <WardrobeIcon />
            <span>Wardrobe</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-700">
            <StorageIcon />
            <span>Storage</span>
          </button>
        </nav>
      );
    };
    

export default BottomNavBar;
