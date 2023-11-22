'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import { useUser } from '@auth0/nextjs-auth0/client';
import { handleLogin } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function Home() {
  const { user } = useUser();

  if (!user) {
    console.log("hello")
  }

  return (user) && (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <GeolocationComponent />
      <TodaysOutfit />
      <BottomNavBar />
    </main>
  );
}
