'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isAuthenticated } = useAuth0();
   
  return isAuthenticated && (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* <GeolocationComponent /> */}
      <TodaysOutfit/>
      <BottomNavBar />
      <h1>whaaat??</h1>
    </main>
  );
}
