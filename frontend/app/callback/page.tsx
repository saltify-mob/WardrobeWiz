import { useEffect, useState } from 'react';

const Callback = () => {
  const [hash, setHash] = useState('');

  useEffect(() => {
    // This code runs on the client side
    setHash(window.location.hash);
  }, []);

  return <div>{hash}</div>;
};

export default Callback;
