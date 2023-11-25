import React from 'react';
import { deleteUser } from '@/app/hooks/deleteUser';
import { useRouter } from 'next/navigation';

const DeleteButton = () => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    const success = await deleteUser();
    if (success) {
      localStorage.clear();
      router.push('/api/auth/login');
    } else {
      console.error('Failed to delete user account');
    }
  };

  return (
    <button onClick={handleDeleteUser}>Delete My Account</button>
  );
};

export default DeleteButton;
