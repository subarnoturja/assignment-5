// service/getMe.ts
import { getStoredToken } from '@/utils/jwt';

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export async function getMe() {
  const token = getStoredToken();
  
  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${BACKEND_BASE}/auth/me`, { // Ensure this route matches your Express backend (/users/me or /auth/me)
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.user || data.data || data; // Return user object
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}