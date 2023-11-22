'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './login';

export default function Home() {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) {
    console.log(isAuthenticated);
    console.log(user?.name);
    return (
      <Login />
    );
  }

  return isAuthenticated && (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <GeolocationComponent />
      <TodaysOutfit />
      <BottomNavBar />
    </main>
  );
}
