import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchOutfitData } from '@/app/hooks/fetchOutfitData';

const SuggestionCard = () => {
  const [outfit, setOutfit] = useState({
    headwearUrl: 'https://via.placeholder.com/100?text=Headwear',
    topUrl: 'https://via.placeholder.com/150?text=Top',
    trousersUrl: 'https://via.placeholder.com/120x180?text=Trousers',
  });
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const loadNewOutfit = async () => {
    try {
      const outfitData = await fetchOutfitData();
      console.log('Fetched Outfit Data:', outfitData);
      setOutfit(outfitData);

    } catch (error) {
      setIsEmpty(true);
    }

  };

  useEffect(() => {
    loadNewOutfit();
  }, []);

  return (
    <>
      {isEmpty ? (
        <div role="alert" className="alert alert-info w-full mb-5 my-5 md:w-1/2 lg:w-1/4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
          <div className="flex flex-col md:flex-row items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 md:mr-3 mb-2 md:mb-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className='text-lg text-left'>
              <h2 className="font-semibold text-xl mb-2">Error: Incomplete Data for Outfit Generation</h2>
              <p className="mb-3">We&apos;re unable to generate your daily outfit recommendation due to insufficient data. To resolve this:</p>
              <ol className="list-decimal list-inside">
                <li className="mb-1"><strong>Add Clothing Items:</strong> Please ensure you have added a variety of clothing items to your wardrobe in the app.</li>
                <li><strong>Enable Location Access:</strong> Allow the app to access your device&apos;s location to provide accurate outfit suggestions based on the current weather.</li>
              </ol>
            </span>
          </div>
        </div>

      ) : (
        <div className="w-full flex flex-col items-center rounded-l">
          <h2 className="text-base sm:text-2xl font-semibold my-2 sm:my-4">Today&rsquo;s Outfit</h2>
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
          <button
            onClick={loadNewOutfit}
            className="fixed sm:sticky bottom-2 right-4 btn w-12 rounded-full md:w-80 lg:w-80 sm:mx-15 px-4 sm:px-24 py-2 bg-teal-900 text-white font-semibold sm:rounded-lg"
          >
            <span className="hidden sm:block">Generate New</span>
            <span className="inline sm:hidden">
              <RefreshIcon />
            </span>
          </button>
        </div>
      )}
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
