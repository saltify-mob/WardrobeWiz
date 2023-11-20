"use client"

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const LoginCallback = () => {
  const { handleRedirectCallback, isAuthenticated } = useAuth0();
  const router = useRouter();
  const [authHandled, setAuthHandled] = useState(false);

  useEffect(() => {
    const handleAuth0Callback = async () => {
      await handleRedirectCallback();
      setAuthHandled(true); // Indicate that Auth0 callback has been handled
    };
    handleAuth0Callback();
  }, [handleRedirectCallback, router]);

  useEffect(() => {
    if (authHandled) {
      // Redirect based on updated isAuthenticated state
      router.push(isAuthenticated ? '/' : '/login');
    }
  }, [authHandled, isAuthenticated, router]);

  return <div>Loading...</div>;
};

export default LoginCallback;
