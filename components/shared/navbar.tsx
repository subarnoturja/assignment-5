'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wrench, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { getStoredToken } from '@/utils/jwt';
import { logoutUser } from '@/service/logout';
import { getMe } from '@/service/getMe';
import { User, Role } from '@/lib/types';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      getMe()
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, []);

  const getDashboardPath = () => {
    if (!user) return '/dashboard';
    if (user.role === Role.ADMIN) return '/admin-dashboard';
    if (user.role === Role.TECHNICIAN) return '/author-dashboard';
    return '/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-blue-600">
          <Wrench className="h-6 w-6" />
          <span>FixItNow</span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-slate-600 focus:outline-none"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent border-b md:border-b-0 p-4 md:p-0 gap-4 md:gap-6 items-start md:items-center`}
        >
          <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium text-sm">
            Home
          </Link>
          <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium text-sm">
            Services
          </Link>

          {user ? (
            <div className="flex items-center gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0">
              <Link
                href={getDashboardPath()}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                onClick={logoutUser}
                className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0">
              <Link href="/login" className="text-xs font-bold text-slate-700 px-3 py-2 hover:text-blue-600">
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}