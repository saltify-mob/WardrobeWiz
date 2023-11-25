'use client';

import Link from 'next/link';
import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';

export default function Settings() {

  return (
    <main>
      <HamburgerMenu />
      <div>Settings Page</div>
      <Link href="/api/auth/logout">Logout</Link>
    </main>
  );
}