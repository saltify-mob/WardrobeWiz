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
    <Button color="red" onClick={handleDeleteUser}>
      Delete My Account
    </Button>
  );
};

export default DeleteButton;
