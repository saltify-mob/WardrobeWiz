'use client';

import HamburgerMenu from '@/app/components/hamburgerMenu/HamburgerMenu';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useWardrobe } from '@/app/contexts/wardrobeContext';
import ClothingForm from '@/app/components/clothingForm/ClothingForm';

const UpdateClothesPage: React.FC = () => {
  const { wardrobe } = useWardrobe();
  const pathname = usePathname();
  const id = pathname.split('/').pop();


  const clothingItem = wardrobe.find((clothing) => clothing.id === id);
  const imageUrl = clothingItem ? clothingItem.imageUrl : '';

  return (
    <main className="w-full flex-col items-center justify-between">
      <HamburgerMenu />
      <Image src={imageUrl} alt="Clothing Image" height={100} width={100} />
      <ClothingForm id={id} />
    </main>
  );
}

export default UpdateClothesPage;
