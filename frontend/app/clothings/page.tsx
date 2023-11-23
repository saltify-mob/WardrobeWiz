'use client';

export const HOST_NAME = 'https://wardrobewiz-backend.azurewebsites.net';

export type Clothes = {
  id: string;
  season: string;
  category: string;
  type: string;
  color: string;
  imageUrl: string;
};

export default function ClothingsPage() {
  return (
    <div>
      {' '}
      <main></main>{' '}
    </div>
  );
}
