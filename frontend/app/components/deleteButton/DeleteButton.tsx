import React from 'react';
import { deleteUser } from '@/app/hooks/deleteUser';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';

const DeleteButton = () => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    if (confirm('Are you sure you want to delete all data?')) {
      const success = await deleteUser();
      if (success) {
        localStorage.clear();
        router.push('/api/auth/logout');
      } else {
        console.error('Failed to delete user account');
      }
    }
  };

  return (
    <Button className="btn btn-error mt-4 w-full mx-15 px-24 py-2 bg-error text-white font-semibold rounded-lg md:w-80 lg:w-80" onClick={handleDeleteUser}>
      Delete My Account
    </Button>
  );
};

export default DeleteButton;
