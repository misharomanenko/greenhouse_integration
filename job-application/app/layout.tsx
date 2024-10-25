import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';
import { theme } from 'app/styles/theme';

const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});

const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen ${theme.background.light} ${theme.background.dark} ${theme.text.body.light} ${theme.text.body.dark}`}>
        {children}
      </div>
    </ThemeProvider>
  );
}
