'use client';

import HamburgerMenu from '../components/hamburgerMenu/HamburgerMenu';

export default function Settings() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <HamburgerMenu />
      <div>Settings Page</div>
    </main>
  );
}