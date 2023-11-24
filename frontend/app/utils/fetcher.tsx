// export const HOST_NAME = 'https://wardrobewiz-backend.azurewebsites.net';
export const HOST_NAME = 'http://localhost:8080';

export const fetcher = (url: string, init?: RequestInit | undefined) => {
  const userId = localStorage.getItem('user-token') as string;

  return fetch(HOST_NAME + url, {
    ...init,
    headers: {
      'ww-user-id': userId,
    },
  });
};
