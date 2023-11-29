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
  const { wardrobe } = useWardrobe();
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

  return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="mb-4 p-4 bg-white shadow rounded md:w-3/4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-2">User Profile</h2>
              <div className="flex items-center">
                {user.picture && <img src={user.picture} alt="Profile" className="w-16 h-16 rounded-full mr-4" />}
                <div>
                  <p className="text-lg">{user.name}</p>
                  <p className="truncate text-sm md:text-base sm: text-overflow">{user.email}</p>
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
