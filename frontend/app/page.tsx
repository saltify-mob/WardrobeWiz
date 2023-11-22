'use client';

import GeolocationComponent from './components/weatherCard/WeatherCard';
import BottomNavBar from './components/navBar/NavBar';
import TodaysOutfit from './components/suggestionCard/SuggestionCard';
import Login from './login';

export default function Home() {
   
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <GeolocationComponent />
      <Login />
      <TodaysOutfit />
      <BottomNavBar />
    </main>
  );
}
