import { UserProfile } from '@auth0/nextjs-auth0/client';
import { fetcher } from '../utils/fetcher';

export const createUser = async (user: UserProfile) => {
  const response = await fetcher('/api/users/' + user.email);
  try {
    if (!response.ok) {
      const fullName = user.name!.split(' ');
      const raw = {
        id: user.email,
        firstName: fullName[0],
        lastName: fullName[1],
      };
      const postResponse = await fetcher('/api/users', {
        method: 'POST',
        body: JSON.stringify(raw)
      });
      if (!postResponse.ok) {
        throw new Error(`HTTP error! status: ${postResponse.status}`);
      }
    }
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
