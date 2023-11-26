'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import SuggestionCard from './components/suggestionCard/SuggestionCard';
import WeatherCard from './components/weatherCard/WeatherCard';
import HamburgerMenu from './components/hamburgerMenu/HamburgerMenu';
import { createUser } from './hooks/createUser';
import { useWardrobe } from './hooks/wardrobeContext';

export default function Home() {
  const { user, isLoading } = useUser();
  const { fetchAndSetWardrobe } = useWardrobe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        localStorage.setItem('user_id', user.email!);
        createUser(user);
        fetchAndSetWardrobe();
      } else if (!user) {
        localStorage.clear();
        router.push('/api/auth/login');
      }
    }
  }, [user, isLoading, fetchAndSetWardrobe]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <main className="w-full flex-col items-center justify-between">
      <HamburgerMenu />
      <WeatherCard />
      <SuggestionCard />
    </main>
  );
}
