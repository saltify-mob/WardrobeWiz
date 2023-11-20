'use client';

import LoginForm from "./components/loginForm/LoginForm";
import GeolocationComponent from "./components/WeatherCardComponent";
import BottomNavBar from "./components/navBarComponent/NavBarComponent";

export default function Home() {

  console.log(process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID)

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <LoginForm />
        <GeolocationComponent />
        <BottomNavBar />
      </main>
  );
}
