'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchWardrobeData } from './fetchWardrobeData';
import { addClothing } from './addClothing';
import { deleteClothing } from './deleteClothing';
import { ClothingItem } from '../types/ClothingItem';
import { updateClothing } from './updateClothing';
import { UpdateClothingData } from '../types/UpdateClothingData';

interface WardrobeContextType {
    wardrobe: ClothingItem[];
    fetchAndSetWardrobe: () => Promise<void>;
    handleAddClothing: (formData: FormData) => Promise<void>;
    handleDeleteClothing: (clothingId: string) => Promise<void>;
    handleUpdateClothing: (clothingId: string, updateData: UpdateClothingData) => Promise<boolean>;
    updateWardrobe: (newWardrobe: ClothingItem[]) => void;
}

const WardrobeContext = createContext<WardrobeContextType>({
    wardrobe: [],
    fetchAndSetWardrobe: async () => { },
    handleAddClothing: async () => { },
    handleDeleteClothing: async () => { },
    handleUpdateClothing: async () => false,
    updateWardrobe: () => {}
});

export const useWardrobe = () => useContext(WardrobeContext);

interface WardrobeProviderProps {
    children: ReactNode;
}

export const WardrobeProvider: React.FC<WardrobeProviderProps> = ({ children }) => {
    const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);

    const fetchAndSetWardrobe = async () => {
        const data = await fetchWardrobeData();
        if (data) {
            setWardrobe(data);
            localStorage.setItem('wardrobe_data', JSON.stringify(data));
        }
    };

    const handleAddClothing = async (formData: FormData) => {
        const addedClothing = await addClothing(formData);
        if (addedClothing) {
            const newWardrobe = [...wardrobe, addedClothing];
            setWardrobe(newWardrobe);
            localStorage.setItem('wardrobe_data', JSON.stringify(newWardrobe));
        }
    };
    
    const handleDeleteClothing = async (clothingId: string) => {
        const success = await deleteClothing(clothingId);
        if (success) {
            const newWardrobe = wardrobe.filter(item => item.id !== clothingId);
            setWardrobe(newWardrobe);
            localStorage.setItem('wardrobe_data', JSON.stringify(newWardrobe));
        }
    };

    const handleUpdateClothing = async (clothingId: string, updateData: UpdateClothingData) => {
        const updatedItem = await updateClothing(clothingId, updateData);
        if (updatedItem) {
            const updatedWardrobe = wardrobe.map(item => item.id === clothingId ? updatedItem : item);
            setWardrobe(updatedWardrobe);
            localStorage.setItem('wardrobe_data', JSON.stringify(updatedWardrobe));
            return true;
        }
        return false;
    };

    const updateWardrobe = (newWardrobe: ClothingItem[]) => {
        setWardrobe(newWardrobe);
        localStorage.setItem('wardrobe_data', JSON.stringify(newWardrobe));
    };

    return (
        <WardrobeContext.Provider value={{ wardrobe, updateWardrobe, fetchAndSetWardrobe, handleAddClothing, handleDeleteClothing, handleUpdateClothing }}>
            {children}
        </WardrobeContext.Provider>
    );
};
