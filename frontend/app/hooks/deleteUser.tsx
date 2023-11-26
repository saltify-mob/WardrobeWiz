import { fetcher } from '../utils/fetcher';

export const deleteUser = async () => {
  const userId = localStorage.getItem('user_id');
  if (!userId) {
    console.error('No user ID found');
    return;
  }
  try {
    const response = await fetcher(`/api/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('User deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
};
