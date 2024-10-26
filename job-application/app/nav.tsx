'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React from 'react';

const HomeNavbar = dynamic(
  () => import('@/app/components/layout/Navbars/Navbar'),
  { ssr: false, loading: () => null }
);

const PATHS_TO_EXCLUDE = new Set([
  '/auth/check-email',
  '/auth/create-organization', 
  '/auth/handle-invite',
  '/auth/login',
  '/auth/reset-password',
  '/auth/invite-accept',
  '/auth/forgot-password',
  '/auth/signup',
  '/settings/personal/profile',
]);

export default function Nav() {
  const pathname = usePathname();

  if (!pathname || PATHS_TO_EXCLUDE.has(pathname)) return null;

  return <HomeNavbar />;
}
