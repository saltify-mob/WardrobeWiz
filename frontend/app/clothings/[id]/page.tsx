import React from 'react';
import { useRouter } from 'next/router';
import HamburgerMenu from '@/app/components/hamburgerMenu/HamburgerMenu';
import AddorUpdateClothingForm from '@/app/components/addOrUpdateClothingForm/AddorUpdateClothingForm';
import { useWardrobe } from '@/app/hooks/wardrobeContext';
import Image from 'next/image';

export default function AddClothingPage({ params }: { params: { id: string } }) {
  const {wardrobe} = useWardrobe();
  const router = useRouter();
  const { id } = router.query;
  const imageUrl = wardrobe.find((clothing) => clothing.id === id)!.imageUrl;

  return (
    <main className="w-full flex-col items-center justify-between">
      <HamburgerMenu />
      <Image src={imageUrl} alt="imageUrl" height={100} width={100} />
      <AddorUpdateClothingForm id={id as string} />
    </main>
  );
}
