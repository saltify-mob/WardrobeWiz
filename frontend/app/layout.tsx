import { UserProvider } from '@auth0/nextjs-auth0/client';

import './globals.css';

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
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
