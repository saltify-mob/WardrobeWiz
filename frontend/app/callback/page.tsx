"use client"

import { useUser } from "@auth0/nextjs-auth0/client";

const Callback = () => {
  const { user, error, isLoading } = useUser();
  
  return user?.name;
};

export default Callback;
