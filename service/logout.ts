import { removeStoredToken } from '@/utils/jwt';

export function logoutUser(): void {
  removeStoredToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}