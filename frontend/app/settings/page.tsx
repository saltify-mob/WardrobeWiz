'use client';

import Link from 'next/link';
import DeleteButton from '../components/deleteButton/DeleteButton';
import { Button, Card, CardBody } from '@material-tailwind/react';

export default function Settings() {
  return (
    <main className="w-full h-full">
      <Card className="mt-4">
        <CardBody>
          <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
          <div className="flex flex-col items-center px-2 gap-2">
            <Link href="/api/auth/logout">
              <Button color="red">Logout</Button>
            </Link>
            <DeleteButton />
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
