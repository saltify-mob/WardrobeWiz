'use client';
import React, { useEffect } from 'react';
import BottomNavBar from '../../components/navBar/NavBar';
import { fetchClothingData } from '../../hooks/ClothingDataFetcher'; // Adjust the path accordingly
import { fetchOutfitData } from '../../hooks/GenerateOutfitFetcher';

export default function Info() {
  useEffect(() => {
    fetchOutfitData();
  }, []); // The empty array ensures this runs only once when the component mounts

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div>Info Page</div>
      <BottomNavBar />
    </main>
  );
}