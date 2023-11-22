'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import Login from './login';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <GeolocationComponent />
        <TodaysOutfit />
        <BottomNavBar />
      </main>
    );
  }

  return <Login />;
}
