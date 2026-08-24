'use server';

import { Role } from "@/lib/types";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export async function registerAction(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const role = formData.get('role') as Role;

  try {
    const res = await fetch(`${BACKEND_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
      cache: 'no-store',
    });

    const data = await res.json();
    if (!res.ok) return { success: false, error: data.message || 'Registration failed' };

    return { success: true, data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Server connection failed';
    return { success: false, error: errorMessage };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch(`${BACKEND_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return { success: false, error: 'Server returned non-JSON response' };
    }

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.message || 'Invalid credentials' };
    }

    const token = data.accessToken || data.token || data.data?.token || data.data?.accessToken;

    if (!token) {
      return { success: false, error: 'Token missing from server response' };
    }

    return { success: true, token, user: data.user || data.data?.user };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Server connection failed';
    return { success: false, error: errorMessage };
  }
}