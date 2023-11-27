import HamburgerMenu from '@/app/components/hamburgerMenu/HamburgerMenu';
import AddorUpdateClothingForm from '@/app/components/addOrUpdateClothingForm/AddorUpdateClothingForm';
import { useWardrobe } from '@/app/hooks/wardrobeContext';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function UpdateClothingPage() {
  const { wardrobe } = useWardrobe();
  const id = usePathname();


  const clothingItem = wardrobe.find((clothing) => clothing.id === id);
  const imageUrl = clothingItem ? clothingItem.imageUrl : '';

  return (
    <main className="w-full flex-col items-center justify-between">
      <HamburgerMenu />
      {imageUrl && <Image src={imageUrl} alt="Clothing Image" height={100} width={100} />}
      <AddorUpdateClothingForm id={id} />
    </main>
  );
}

export async function getServerSideProps(context: { params: { id: string; }; }) {
  const { id } = context.params;
  return {
    props: { id }, 
  };
}
