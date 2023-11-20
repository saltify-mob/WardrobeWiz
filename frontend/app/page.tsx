'use client';

import LoginForm from "./components/loginForm/LoginForm";
import GeolocationComponent from "./components/WeatherCardComponent";
import BottomNavBar from "./components/navBarComponent/NavBarComponent";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated } = useAuth0();


  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {!isAuthenticated && <LoginForm />}
          {isAuthenticated && (
          <>
            <GeolocationComponent />
            <BottomNavBar />
          </>
          )}
      </main>
  );
}
