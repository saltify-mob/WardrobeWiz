import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';
import AddOrUpdateClothingForm from '../components/addOrUpdateClothingForm/AddOrUpdateClothingForm';

const AddClothesPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center w-full">
      <HamburgerMenu />
      <h1 className="text-2xl font-bold my-4 text-center">Add Clothes</h1>
      <AddOrUpdateClothingForm />
    </main>
  );
};

export default AddClothesPage;
