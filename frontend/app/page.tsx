'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import SuggestionCard from './components/suggestionCard/SuggestionCard';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { fetchClothingData } from './hooks/fetchClothingData';
import { fetchOutfitData } from './hooks/fetchOutfitData';
import { createUser } from './hooks/createUser';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem('user_id', user.email);
    } else {
      localStorage.removeItem('user_id');
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && user) {
      createUser(user);
      fetchClothingData();
      fetchOutfitData();
    } else if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isLoading, router]);

  return (
    <main className="w-full flex-col items-center justify-between">
      <GeolocationComponent />
      <SuggestionCard />
    </main>
  );
}
