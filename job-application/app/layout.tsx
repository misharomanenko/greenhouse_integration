import { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';

import '@/styles/globals.css';

import { ThemeProvider } from '@/app/components/themes/ThemeProvider';
import { Toaster } from 'sonner';
import Nav from './nav';
import MainLayout from './components/layout/MainLayout';

const hoves = localFont({
  src: [
    { path: '../public/fonts/TTHoves/Regular.ttf', style: 'normal' },
    { path: '../public/fonts/TTHoves/Bold.ttf', style: 'normal' },
    { path: '../public/fonts/TTHoves/Demibold.ttf', style: 'normal' },
    { path: '../public/fonts/TTHoves/Light.ttf', style: 'normal' },
    { path: '../public/fonts/TTHoves/Medium.ttf', style: 'normal' },
  ],
  variable: '--font-hoves',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://app.greenhouse.io'),
  title: 'Greenhouse Application',
  description:
    'Apply to jobs and opportunities through our Greenhouse application portal.',
  robots: 'noindex, nofollow',
  icons: [{ url: '/favicon.ico' }],
  twitter: {
    card: 'summary_large_image',
    site: '@Greenhouse',
    creator: '@Greenhouse',
  },
  openGraph: {
    title: 'Greenhouse Application',
    description:
      'Apply to jobs and opportunities through our Greenhouse application portal.',
    url: 'https://app.greenhouse.io',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning className={`${hoves.variable}`}>
      <body className='antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300'>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Nav />
          <Toaster closeButton className='font-sans' />
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
