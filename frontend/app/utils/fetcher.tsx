export const HOST_NAME = 'https://wardrobewiz-backend.azurewebsites.net';

export const fetcher = (url: string, init?: RequestInit) => {
  const userId = localStorage.getItem('user_id') as string;

  const headers: HeadersInit = new Headers(init?.headers);
  headers.set('ww-user-id', userId);

  if (init?.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(HOST_NAME + url, {
    ...init,
    headers: headers,
  });
};
