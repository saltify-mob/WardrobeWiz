"use client"

import { useEffect, useState } from 'react';

const Callback = () => {
  const [hash, setHash] = useState('');

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  return <div>{hash}</div>;
};

export default Callback;
