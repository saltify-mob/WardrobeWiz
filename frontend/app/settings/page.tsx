'use client';

import Link from 'next/link';
import DeleteButton from '../components/deleteButton/DeleteButton';
import { Button, Card, CardBody } from '@material-tailwind/react';

export default function Settings() {
  return (
    <main className="w-full h-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
          <div className="flex flex-col items-center px-2 gap-2">
            <Button className="btn btn-primary mt-4 w-full mx-15 px-24 py-2 bg-primary text-white font-semibold rounded-lg md:w-80 lg:w-80">
              <Link href="/api/auth/logout">Logout</Link>
            </Button>
            <DeleteButton />
          </div>
    </main>
  );
}
