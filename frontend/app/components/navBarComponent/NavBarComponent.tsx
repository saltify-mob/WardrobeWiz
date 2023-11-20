import React from 'react';

import { InfoIcon, AddClothesIcon, HomeIcon, WardrobeIcon, StorageIcon } from './icons';

const BottomNavBar = () => {
  return (
    <nav className="bottom-nav">
      <button className="nav-item">
        <InfoIcon />
        <span>Info</span>
      </button>
      <button className="nav-item">
        <AddClothesIcon />
        <span>Add Clothes</span>
      </button>
      <button className="nav-item">
        <HomeIcon />
        <span>Home</span>
        <button className="nav-item">
        <WardrobeIcon />
        </button>
        <span>Wardrobe</span>
      </button>
      <button className="nav-item">
        <StorageIcon />
        <span>Storage</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;
