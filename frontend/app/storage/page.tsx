'use client';

import React from 'react';

import BottomNavBar from '../components/navBar/NavBar';
import StorageCard from '../components/storage/StorageCard';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';

export default function Storage() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-4">
    <HamburgerMenu />
    <div>Storage Page</div>
    <StorageCard/>
  </main>
  );
}
