'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClothingItem } from './types/ClothingItem';
import { fetchClothingData } from './hooks/ClothingDataFetcher';


export default function Home() {
  const { user, isLoading } = useUser();
  const [ userClothes, setUserClothes ] = useState<ClothingItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      fetchClothingData().then((data) => {
        setUserClothes(data);
      }).catch((error) => {
        console.error('Failed to fetch clothing data:', error);
      });
    } else if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isLoading, router]);

  return user && (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <GeolocationComponent />
      <TodaysOutfit />
      <BottomNavBar />
    </main>
  );
}
