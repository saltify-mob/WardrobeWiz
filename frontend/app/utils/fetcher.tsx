export const HOST_NAME = 'https://wardrobewiz-backend.azurewebsites.net';
// export const HOST_NAME = 'http://localhost:8080';

export const fetcher = (url: string, init?: RequestInit) => {
  const userId = localStorage.getItem('user_id') as string;

  const headers = {
    'Content-Type': 'application/json',
    'ww-user-id': userId,
    ...init?.headers,
  };

  return fetch(HOST_NAME + url, {
    ...init,
    headers: headers,
  });
};
