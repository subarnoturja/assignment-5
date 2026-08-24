'use client';

import React, { useEffect, useState } from 'react';
import DashboardSidebar from './_components/dashboard-sidebar';
import { getMe } from '@/service/getMe';
import { User } from '@/lib/types';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  if (!user) return <div className="p-8 text-center text-sm">Authenticating Session...</div>;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <DashboardSidebar role={user.role} />
      <div className="flex-1">{children}</div>
    </div>
  );
}