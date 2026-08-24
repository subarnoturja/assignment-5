'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@/lib/api-client';
import { Booking, BookingStatus } from '@/lib/types';
import StatusBadge from '../_components/status-badge';
import { getStoredToken } from '@/utils/jwt';
import { updateBookingStatusAction } from '../_actions/dashboard';

export default function TechnicianDashboardPage() {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ['technician-bookings'],
    queryFn: () => fetcher('/technician/bookings/all'),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      const token = getStoredToken();
      if (!token) throw new Error('Unauthenticated');
      return updateBookingStatusAction(token, id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technician-bookings'] });
    },
  });

  if (isLoading) return <div className="p-8 text-center text-sm">Loading job requests...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Technician Queue</h1>
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b text-slate-600">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Scheduled Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookings?.map((b) => (
                <tr key={b.id}>
                  <td className="p-4 font-semibold">{b.customer?.name || 'Customer'}</td>
                  <td className="p-4">{new Date(b.scheduledAt).toLocaleString()}</td>
                  <td className="p-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {b.status === BookingStatus.REQUESTED && (
                      <>
                        <button
                          onClick={() => updateStatusMutation.mutate({ id: b.id, status: BookingStatus.ACCEPTED })}
                          className="px-3 py-1 bg-emerald-600 text-white font-semibold text-xs rounded-lg"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatusMutation.mutate({ id: b.id, status: BookingStatus.DECLINED })}
                          className="px-3 py-1 bg-rose-600 text-white font-semibold text-xs rounded-lg"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {b.status === BookingStatus.PAID && (
                      <button
                        onClick={() => updateStatusMutation.mutate({ id: b.id, status: BookingStatus.IN_PROGRESS })}
                        className="px-3 py-1 bg-blue-600 text-white font-semibold text-xs rounded-lg"
                      >
                        Start Job
                      </button>
                    )}
                    {b.status === BookingStatus.IN_PROGRESS && (
                      <button
                        onClick={() => updateStatusMutation.mutate({ id: b.id, status: BookingStatus.COMPLETED })}
                        className="px-3 py-1 bg-slate-800 text-white font-semibold text-xs rounded-lg"
                      >
                        Complete Job
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}