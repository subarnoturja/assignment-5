'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setStoredToken } from '@/utils/jwt';
import { Role } from '@/lib/types';
import { loginAction } from '../_actions/auth';
import AuthForm from '../_components/auth-form';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    if (res.success && res.token) {
      setStoredToken(res.token);
      if (res.user.role === Role.ADMIN) router.push('/admin-dashboard');
      else if (res.user.role === Role.TECHNICIAN) router.push('/author-dashboard');
      else router.push('/dashboard');
    } else {
      setError(res.error || 'Login failed.');
      setLoading(false);
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