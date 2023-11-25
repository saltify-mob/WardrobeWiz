'use client';

import Link from 'next/link';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';

export default function Settings() {

  return (
    <main className="w-full flex-col items-center justify-between">
      <HamburgerMenu />
      <div>Settings Page</div>
      <Link href="/api/auth/logout">Logout</Link>
    </main>
  );
}