'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <GeolocationComponent />
        <TodaysOutfit />
        <BottomNavBar />
      </main>
    );
  } else {
    router.push("/api/auth/login");
  }
}
