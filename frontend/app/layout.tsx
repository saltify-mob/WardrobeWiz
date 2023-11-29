import { UserProvider } from '@auth0/nextjs-auth0/client';

import './globals.css';
import { WardrobeProvider } from './contexts/wardrobeContext';
import HamburgerMenu from './components/hamburgerMenu/HamburgerMenu';

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
          <body
            className="h-screen w-screen"
          >
            <HamburgerMenu />
            {children}
          </body>
        </WardrobeProvider>
      </UserProvider>
    </html>
  );
}
