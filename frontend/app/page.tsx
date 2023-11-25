'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createUser } from './hooks/createUser';

import SuggestionCard from './components/suggestionCard/SuggestionCard';
import WeatherCard from './components/weatherCard/WeatherCard';
import HamburgerMenu from './components/hamburgerMenu/HamburgerMenu';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        localStorage.setItem('user_id', user.email!);
        createUser(user);
      } else {
        localStorage.removeItem('user_id');
        router.push('/api/auth/login');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="w-full flex-col items-center justify-between">Loading...</div>;
  }

  if (!user) {
    return <div className="w-full flex-col items-center justify-between">Redirecting to login...</div>;
  }
  
  return (
    <main className="w-full flex-col items-center justify-between">
      <HamburgerMenu />
      <WeatherCard />
      <SuggestionCard />
    </main>
  );
}
