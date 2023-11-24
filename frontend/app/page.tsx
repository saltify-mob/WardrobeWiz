'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { fetchClothingData } from './hooks/ClothingDataFetcher';
import { fetchOutfitData } from './hooks/GenerateOutfitFetcher';
import { create } from 'domain';
import { createUser } from './hooks/createUser';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      createUser(user.email!);
      fetchClothingData();
      fetchOutfitData();
    } else if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isLoading, router]);

  return (
    <main className="w-full flex-col items-center justify-between p-4">
      <GeolocationComponent />
      <TodaysOutfit />
    </main>
  );
}
