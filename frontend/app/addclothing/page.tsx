import ClothingForm from '../components/clothingForm/ClothingForm';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';


const AddClothesPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center w-full">
      <HamburgerMenu />
      <h1 className="text-2xl font-bold my-4 text-center">Add Clothes</h1>
      <ClothingForm />
    </main>
  );
};

export default AddClothesPage;
