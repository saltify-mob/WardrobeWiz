import ClothingForm from '../components/clothingForm/ClothingForm';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';


const AddClothesPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center w-full p-10">
    <h1 className="text-2xl font-bold text-primary-content text-center">Add Clothes</h1>
      <ClothingForm />
    </main>
  );
};

export default AddClothesPage;
