'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navConfig } from '../_config/dashboard-nav';
import { Role } from '@/lib/types';

export default function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const links = navConfig[role] || [];

  return (
    <aside className="w-full md:w-64 bg-white border rounded-2xl p-4 flex flex-col gap-2">
      <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2 px-3">
        {role} Navigation
      </div>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
              isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </aside>
  );
}