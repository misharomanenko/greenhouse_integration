import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | Greenhouse App',
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
