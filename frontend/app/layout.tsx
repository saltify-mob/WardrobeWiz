import { UserProvider } from '@auth0/nextjs-auth0/client';

import './globals.css';
import { WardrobeProvider } from './contexts/wardrobeContext';

export const metadata = {
  title: 'Wardrobe Wiz',
  description: 'A clothing app for suggesting clothes for the day based on the weather.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <WardrobeProvider>
          <body>{children}</body>
        </WardrobeProvider>
      </UserProvider>
    </html>
  );
}
