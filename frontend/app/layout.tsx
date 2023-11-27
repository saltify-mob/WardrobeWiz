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
    <html lang="en">
      <UserProvider>
        <WardrobeProvider>
          <body
            className="h-screen w-screen"
            style={{
              background:
                'linear-gradient(180deg, rgba(77, 157, 219, 0.7) 0%, rgba(213, 232, 246, 0) 100%)',
            }}
          >
            <HamburgerMenu />
            {children}
          </body>
        </WardrobeProvider>
      </UserProvider>
    </html>
  );
}
