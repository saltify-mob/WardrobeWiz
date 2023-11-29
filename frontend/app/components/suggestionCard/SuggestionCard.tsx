import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchOutfitData } from '@/app/hooks/fetchOutfitData';

const SuggestionCard = () => {
  const [outfit, setOutfit] = useState({
    headwearUrl: 'https://via.placeholder.com/100?text=Headwear',
    topUrl: 'https://via.placeholder.com/150?text=Top',
    trousersUrl: 'https://via.placeholder.com/120x180?text=Trousers',
  });
  
  const [isEmptyMessage, setIsEmptyMessage] = useState<string>("Today's Outfit");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const loadNewOutfit = async () => {
    try {
      const outfitData = await fetchOutfitData();
      console.log('Fetched Outfit Data:', outfitData);
      setOutfit(outfitData);
      
    } catch (error) {
      setIsEmptyMessage('Looks like your wardrobe is empty! Get started by adding clothes.');
      setIsEmpty(true);
    }
   
  };

  useEffect(() => {
    loadNewOutfit();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-center rounded-l">

        {isEmpty ?
        <div role="alert" className="alert alert-info w-full mb-5 my-5 md:w-1/4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
            <span className='text-lg'>Looks like your wardrobe is empty! Get started by adding clothes.</span>
        </div>
          :
          <h2 className="text-base sm:text-2xl font-semibold my-2 sm:my-4">Today's Outfit</h2>
        }

        <div className="flex flex-col items-center mb-6 space-y-4">
          <Image
            src={outfit.headwearUrl}
            alt="Headwear"
            width={130}
            height={100}
            objectFit="cover"
            className="rounded-md shadow-2xl h-32 lg:h-36"
          />
          <Image
            src={outfit.topUrl}
            alt="Top"
            width={170}
            height={150}
            objectFit="cover"
            className="rounded-md shadow-2xl h-40 lg:h-52"
          />
          <Image
            src={outfit.trousersUrl}
            alt="Trousers"
            width={170}
            height={180}
            objectFit="cover"
            className="rounded-md shadow-2xl h-48 lg:h-60"
          />
        </div>
      </div>
      <button
        onClick={loadNewOutfit}
        className="fixed sm:sticky bottom-2 right-4 btn w-12 rounded-full md:w-80 lg:w-80 sm:mx-15 px-4 sm:px-24 py-2 bg-teal-900 text-white font-semibold sm:rounded-lg"
      >
        <span className="hidden sm:block">Generate New</span>
        <span className="inline sm:hidden">
          <RefreshIcon />
        </span>
      </button>
    </>
  );
};

const RefreshIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
};

export default SuggestionCard;
