'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';
import GeolocationComponent from './components/WeatherCardComponent';
import BottomNavBar from './components/navBarComponent/NavBarComponent';

export default function Home() {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated && (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GeolocationComponent />
      <BottomNavBar />
    </main>
  );
}
