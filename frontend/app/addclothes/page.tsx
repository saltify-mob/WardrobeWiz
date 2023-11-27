import React from 'react';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';
import AddClothingForm from '../components/addClothingForm/AddClothingForm'; // Adjust the import path as needed

const AddClothesPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center w-full">
      <HamburgerMenu />
      <h1 className="text-2xl font-bold my-4 text-center">Add Clothes</h1>
      <AddClothingForm />
    </main>
  );
};

export default AddClothesPage;
