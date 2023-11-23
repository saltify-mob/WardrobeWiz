'use client';
import { useState } from 'react';
import { HOST_NAME } from '../page';
import { useRouter } from 'next/navigation';

export default function AddClothingPage() {
  const [file, setFile] = useState<Blob | null>(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddClothing = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem('user-token') as string;

    const formData = new FormData();
    formData.append('season', 'winter');
    formData.append('type', 'jacket');
    formData.append('category', 'top');
    formData.append('color', 'blue');
    formData.append('dateOfPurchase', '2023-08-08');
    formData.append('timeLastUsed', '2023-08-08');
    formData.append('userId', userToken);
    if (file) {
      formData.append('image', file);
    }

    fetch(`${HOST_NAME}/api/clothings`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => router.replace('/clothings'));
  };

  return (
    <form onSubmit={handleAddClothing}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
