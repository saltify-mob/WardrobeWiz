import { UserProfile } from '@auth0/nextjs-auth0/client';
import { fetcher } from '../utils/fetcher';

export const createUser = async (user: UserProfile) => {
  const response = await fetcher('/api/users/' + user.email);

  if (!response.ok) {
    const fullName = user.name!.split(' ');
    const raw = JSON.stringify({
      id: user.email,
      firstName: fullName[0],
      lastName: fullName[1],
    });
    const response = await fetcher('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: raw,
    });
  }
};
