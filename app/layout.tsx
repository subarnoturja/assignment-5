'use client';

import '@/app/globals.css';
import React from 'react';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}