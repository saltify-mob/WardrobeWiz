'use client';

import { Auth0Provider } from "@auth0/auth0-react";
import LoginForm from "./components/loginForm/LoginForm";
import { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN!}
      clientId={process.env.AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: isClient ? window.location.origin : undefined
      }}
    >
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <LoginForm />
      </main>
    </Auth0Provider>
  );
}
