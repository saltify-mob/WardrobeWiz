"use client";

import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useWardrobe } from '../contexts/wardrobeContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import DeleteButton from '../components/deleteButton/DeleteButton';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';
import { ClothingItem } from '../types/ClothingItem';
import { useRouter } from 'next/navigation';
import ClothingCard from '../components/clothingCard/ClothingCard';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryCount {
  [key: string]: number;
}

interface ChartDataType {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

export default function Settings() {
  const { user } = useUser();
  const { wardrobe, handleDeleteClothing, handleUpdateClothing } = useWardrobe();
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  });

  const router = useRouter();

  const totalCount = wardrobe.length;

  const categories: CategoryCount = useMemo(() => wardrobe.reduce((acc: CategoryCount, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {}), [wardrobe]);

  const pieData: ChartDataType = useMemo(() => ({
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF'],
      },
    ],
  }), [categories]);

  useEffect(() => {
    setChartData(pieData);
  }, [pieData]);

  const handlePieChartClick = (event: any) => {
    const canvas = event.currentTarget;
    const chart = ChartJS.getChart(canvas);
    if (!chart) return;

    const activePoints = chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', { intersect: true }, false);
    if (activePoints.length === 0) {
      setChartData(pieData);
      setSelectedCategory(null);
      return;
    }

    const clickedElementIndex = activePoints[0].index;
    const clickedCategory = pieData.labels[clickedElementIndex];

    if (clickedCategory === selectedCategory) {
      setChartData(pieData);
      setSelectedCategory(null);
    } else {
      const typesData = wardrobe.filter(item => item.category === clickedCategory).reduce((acc: CategoryCount, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});

      const updatedChartData = {
        labels: Object.keys(typesData),
        datasets: [
          {
            data: Object.values(typesData),
            backgroundColor: pieData.datasets[0].backgroundColor,
          },
        ],
      };
      setChartData(updatedChartData);
      setSelectedCategory(clickedCategory);
    }
  };

  function getSeasonFromCoords(latitude: number) {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const isNorthernHemisphere = latitude >= 0;

    return (isNorthernHemisphere) ?
      ((month >= 2 && month <= 4) ? 'spring' :
        (month >= 5 && month <= 7) ? 'summer' :
          (month >= 8 && month <= 10) ? 'autumn' : 'winter') :
      ((month >= 2 && month <= 4) ? 'autumn' :
        (month >= 5 && month <= 7) ? 'winter' :
          (month >= 8 && month <= 10) ? 'spring' : 'summer');
  }

  function getCurrentSeasonFromLocalStorage() {
    if (typeof window !== "undefined") {
      const weatherDataString = localStorage.getItem('weatherData');
      if (weatherDataString) {
        try {
          const weatherData = JSON.parse(weatherDataString);

          if (weatherData && weatherData.coord && typeof weatherData.coord.lat === 'number') {
            const latitude = weatherData.coord.lat;
            return getSeasonFromCoords(latitude);
          }
        } catch (error) {
          console.error('Error parsing weatherData from local storage:', error);
        }
      }
    }
    return null;
  }

  const handleItemClick = (item: ClothingItem) => {
    setSelectedClothing(item);
  };

  const handleDelete = async (id: string) => {
    try {
      await handleDeleteClothing(id);
      if (selectedClothing?.id === id) {
        setSelectedClothing(null);
      }
    } catch (error) {
      console.error('Error deleting clothing item:', error);
    }
  };

  const handleSendToStorage = async (clothing: ClothingItem) => {
    const updatedData = { ...clothing, location: 'storage' };
    const success = await handleUpdateClothing(clothing.id, updatedData);
    if (success) {
      console.log('Item sent to storage');
      setSelectedClothing(null);
    } else {
      console.error('Failed to send clothing item to storage');
    }
  };

  const handleSendToWardrobe = async (clothing: ClothingItem) => {
    const updatedData = { ...clothing, location: 'wardrobe' };
    const success = await handleUpdateClothing(clothing.id, updatedData);
    if (success) {
      console.log('Item sent to wardrobe');
      setSelectedClothing(null);
    } else {
      console.error('Failed to send clothing item to wardrobe');
    }
  };

  const closeDetail = () => {
    setSelectedClothing(null);
  };

  function handleUpdate(id: string): void {
    router.push(`/updateclothing/${id}`);
  }

  const currentSeason = getCurrentSeasonFromLocalStorage();
  const clothesToSendToWardrobe = wardrobe.filter(item => item.season === currentSeason && item.location === "storage");
  const clothesToSendToStorage = wardrobe.filter(item => item.season !== currentSeason && item.location === "wardrobe");

  return (
    <div className="container mx-auto p-4 mt-8 sm:mt-0">
      {user && (
        <div className="mb-4 p-4 bg-white shadow rounded md:w-3/4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-2">User Profile</h2>
              <div className="flex items-center">
                {user.picture && <img src={user.picture} alt="Profile" className="w-16 h-16 rounded-full mr-4" />}
                <div>
                  <p className="text-lg">{user.name}</p>
                  <p
                    className="truncate text-sm md:text-base sm: text-overflow w-64 lg:w-96"
                    title={user.email as string}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 flex flex-col items-stretch">
              <Button className="btn btn-teal-900 bg-teal-900 w-full my-2 flex-grow">
                <Link href="/api/auth/logout">
                  Logout
                </Link>
              </Button>
              <DeleteButton />
            </div>
          </div>
        </div>
      )}
      <div className="p-4 bg-white shadow rounded mt-4 w-full md:w-3/4 mx-auto">
        <h2 className="text-xl font-semibold">Bring to Wardrobe</h2>
        {clothesToSendToWardrobe.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {clothesToSendToWardrobe.map(item => (
              <div key={item.id} className='card bg-gray-100 rounded-lg p-4 shadow hover:shadow-md transition duration-300 cursor-pointer' onClick={() => handleItemClick(item)}>
                <img src={item.imageUrl} alt={`${item.type}`} className="w-full h-32 object-cover rounded-md" />
                <h3 className="text-lg mt-2">{item.color} {item.type}</h3>
                <p className="text-sm text-gray-600">{item.season}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>All suitable items are already in the wardrobe.</p>
        )}
      </div>

      <div className="p-4 bg-white shadow rounded mt-4 w-full md:w-3/4 mx-auto">
        <h2 className="text-xl font-semibold">Send to Storage</h2>
        {clothesToSendToStorage.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {clothesToSendToStorage.map(item => (
              <div key={item.id} className='card bg-gray-100 rounded-lg p-4 shadow hover:shadow-md transition duration-300 cursor-pointer' onClick={() => handleItemClick(item)}>
                <img src={item.imageUrl} alt={`${item.type}`} className="w-full h-32 object-cover rounded-md" />
                <h3 className="text-lg mt-2">{item.color} {item.type}</h3>
                <p className="text-sm text-gray-600">{item.season}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>All out-of-season items are already in storage.</p>
        )}
      </div>

      {
        selectedClothing && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ClothingCard
              clothing={selectedClothing}
              onClose={closeDetail}
              onDelete={() => handleDelete(selectedClothing.id)}
              onSendTo={selectedClothing.location === 'wardrobe' ? () => handleSendToStorage(selectedClothing) : () => handleSendToWardrobe(selectedClothing)}
              onUpdate={() => handleUpdate(selectedClothing.id)}
              sendToLabel={selectedClothing.location === 'wardrobe' ? 'Send to Storage' : 'Bring to Wardrobe'}
            />
          </div>
        )
      }
      <div className="grid mt-4 grid-cols-1 gap-4">
        <div className="p-4 bg-white shadow rounded w-full md:w-3/4 mx-auto">
          <h2 className="text-xl font-semibold">Wardrobe Breakdown</h2>
          <div className="w-full md:w-2/3 mx-auto">
            <Pie data={chartData} onClick={handlePieChartClick} />
          </div>
        </div>
        <div className="p-4 bg-white shadow rounded w-full md:w-3/4 mx-auto">
          <h2 className="text-2xl font-bold mb-2">Wardrobe Statistics</h2>
          <p>Total items: {totalCount}</p>
        </div>
      </div>
    </div>
  );
}
