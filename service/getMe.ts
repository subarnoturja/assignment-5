import { fetcher } from '@/lib/api-client';
import { User } from '@/lib/types';

export async function getMe(): Promise<User> {
  return fetcher<User>('/auth/me');
}