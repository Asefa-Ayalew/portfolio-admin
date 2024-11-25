'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import SideNav from './side-nav/side-nav';
import Header from './header/header';
import Footer from './footer/footer';
import { Box } from '@mantine/core';
import { useAuth } from '../../ui/context/auth-context';
import AuthGuard from '../../ui/auth/middleware/auth-guard';

interface ShellProps {
  children: ReactNode;
}

const Shell: React.FC<ShellProps> = ({ children }) => {
  const router = useRouter();
  const user = useAuth();
  const pathname = usePathname(); // Get current path using usePathname

  useEffect(() => {
    const session = localStorage.getItem('userSession'); // Check session in localStorage
    if (session) {
      // Redirect authenticated users to the dashboard if they're on the login page
      if (pathname === '/login') {
        router.push('/dashboard');
      }
    } else if (!user && pathname !== '/login') {
      // Redirect unauthenticated users to the login page
      router.push('/login');
    }
  }, [user, pathname, router]);

  // If on the login page, render only the children (login form)
  if (pathname === '/login') {
    return <main className="flex items-center justify-center min-h-screen">{children}</main>;
  }

  // Render the full layout (menus and content) for authenticated users
  return (
    <AuthGuard>
      <Box className="flex flex-col min-h-screen">
        <Box className="flex flex-1">
          <Box className="w-1/6">
            <SideNav />
          </Box>
          <Box className="w-5/6 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </Box>
        </Box>
        <Footer />
      </Box>
    </AuthGuard>
  );
};

export default Shell;
