'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@/lib/api-client';
import { User } from '@/lib/types';
import { getStoredToken } from '@/utils/jwt';
import { toggleUserStatusAction } from '../_actions/dashboard';

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['admin-users'],
    queryFn: () => fetcher('/admin/users'),
  });

  const toggleUserStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'ACTIVE' | 'BANNED' }) => {
      const token = getStoredToken();
      if (!token) throw new Error('Unauthenticated');
      return toggleUserStatusAction(token, id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });

  if (isLoading) return <div className="p-8 text-center text-sm">Loading user registry...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Platform User Management</h1>
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b text-slate-600">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users?.map((u) => (
              <tr key={u.id}>
                <td className="p-4 font-semibold">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 font-bold text-xs">{u.role}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() =>
                      toggleUserStatus.mutate({
                        id: u.id,
                        status: u.status === 'BANNED' ? 'ACTIVE' : 'BANNED',
                      })
                    }
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${
                      u.status === 'BANNED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {u.status === 'BANNED' ? 'Unban' : 'Ban'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}