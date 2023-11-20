"use client"

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const Callback = () => {
  const { handleRedirectCallback, isAuthenticated } = useAuth0();
  const router = useRouter();
  const [authHandled, setAuthHandled] = useState(false);

  useEffect(() => {
    const handleAuth0Callback = async () => {
      await handleRedirectCallback();
      setAuthHandled(true);
    };
    handleAuth0Callback();
  }, [handleRedirectCallback, router]);

  useEffect(() => {
    if (authHandled) {
      router.push(isAuthenticated ? '/' : '/login');
    }
  }, [authHandled, isAuthenticated, router]);

  return "Hello"
};

export default Callback;
