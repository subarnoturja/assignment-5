export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function setStoredToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
}

export function removeStoredToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
}