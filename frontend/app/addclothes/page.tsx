'use client';

import React from 'react';
import BottomNavBar from '../components/navBar/NavBar';


export default function addClothes() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-4">
  <div>Add-Clothes Page</div>
  <BottomNavBar />
</main>
  );
}