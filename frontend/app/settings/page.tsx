'use client';

import Link from 'next/link';
import DeleteButton from '../components/deleteButton/DeleteButton';

export default function Settings() {
  return (
    <main className="w-full flex-col items-center justify-between">
      <h1 className="text-2xl font-bold py-2">Settings</h1>
      <Link href="/api/auth/logout">Logout</Link>
      <DeleteButton />
    </main>
  );
}
