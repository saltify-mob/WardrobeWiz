'use client';

import { Auth0Provider } from "@auth0/auth0-react";
import LoginForm from "./components/loginForm/LoginForm";
import GeolocationComponent from "./components/WeatherCardComponent";
import BottomNavBar from "./components/navBarComponent/NavBarComponent";

export default function Home() {

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <LoginForm />
        <GeolocationComponent />
        <BottomNavBar />
      </main>
  );
}
