import ClothingForm from '../components/clothingForm/ClothingForm';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';


const AddClothesPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center w-full p-3">
      <ClothingForm />
    </main>
  );
};

export default AddClothesPage;
