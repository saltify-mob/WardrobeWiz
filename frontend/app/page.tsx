'use client';

// Home.tsx

import React, { useEffect } from 'react';
import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import Login from './login';
import { fetchClothingData } from './hooks/ClothingDataFetcher'; // Import the function

const Home: React.FC = () => {

  useEffect(() => {
    fetchClothingData(); // Fetch clothing data when the component mounts
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <GeolocationComponent />
      <Login />
      <TodaysOutfit />
      <BottomNavBar />
    </main>
  );
};

export default Home;
