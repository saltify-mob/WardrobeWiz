'use client';

import { Auth0Provider } from "@auth0/auth0-react";
import LoginForm from "./components/loginForm/LoginForm";

export default function Home() {

  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN!}
      clientId={process.env.AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: 'https://wardrobe-wiz.vercel.app/'
      }}
    >
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <LoginForm />
      </main>
    </Auth0Provider>
  );
}
