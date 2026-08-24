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
  } catch (err: any) {
    return { success: false, error: err.message || 'Server connection failed' };
  }
}