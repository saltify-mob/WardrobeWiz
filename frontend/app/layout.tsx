import { UserProvider } from '@auth0/nextjs-auth0/client';

import './globals.css';
import { WardrobeProvider } from './contexts/wardrobeContext';
import HamburgerMenu from './components/hamburgerMenu/HamburgerMenu';
import Link from 'next/link';

export const metadata = {
  title: 'Wardrobe Wiz',
  description:
    'A clothing app for suggesting clothes for the day based on the weather.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="nord">
      <UserProvider>
        <WardrobeProvider>
          <body className="h-screen w-screen flex flex-col sm:pt-16">
            <HamburgerMenu />
            <div className="flex-1  pb-4">{children}</div>

            <footer className="bg-neutral py-5 mt-auto text-center text-sm text-base-100">
              <Link
                href="https://github.com/saltify-mob/WardrobeWiz"
                className="text-base-100 hover:underline"
              >
                © 2023 Saltify™. All Rights Reserved.
              </Link>
            </footer>
          </body>
        </WardrobeProvider>
      </UserProvider>
    </html>
  );
}
