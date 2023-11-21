"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Callback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');

    if (accessToken) {
      fetch('https://dev-zhqvuxtn6agalo22.us.auth0.com/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserInfo(data);
        router.push('/');
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        router.push('/login');
      });
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!userInfo) return <div>Loading user info...</div>;

  return <div>{JSON.stringify(userInfo)}</div>;
};

export default Callback;
