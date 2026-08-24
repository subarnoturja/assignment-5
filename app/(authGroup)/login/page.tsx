'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setStoredToken } from '@/utils/jwt';
import { Role } from '@/lib/types';
import { loginAction } from '../_actions/auth';
import AuthForm from '../_components/auth-form';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    setLoading(false);

    if (res.success && res.token) {
      // 1. Save token
      localStorage.setItem('accessToken', res.token);
      
      // 2. Hard redirect forces Navbar to re-render with fresh token state
      window.location.href = '/dashboard';
    } else {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <AuthForm title="Account Sign In" subtitle="Access your platform dashboard">
      {error && <div className="p-3 text-xs bg-red-50 text-red-600 rounded-lg">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Email Address</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </AuthForm>
  );
}