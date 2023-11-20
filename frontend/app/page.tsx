'use client';

import LoginForm from "./components/loginForm/LoginForm";
import GeolocationComponent from "./components/WeatherCardComponent";
import BottomNavBar from "./components/navBarComponent/NavBarComponent";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated } = useAuth0();


  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
    >
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {!isAuthenticated && <LoginForm />}
          {isAuthenticated && (
          <>
            <GeolocationComponent />
            <BottomNavBar />
          </>
          )}
      </main>
    </Auth0Provider>
  );
}
