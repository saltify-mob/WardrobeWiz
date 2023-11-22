'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/api/auth/login');
    }
  });

  return user && (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <GeolocationComponent />
      <TodaysOutfit />
      <BottomNavBar />
    </main>
  );
}
