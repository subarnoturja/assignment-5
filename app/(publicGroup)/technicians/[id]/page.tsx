'use client';

import { use, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetcher } from '@/lib/api-client';
import { TechnicianProfile } from '@/lib/types';
import { getStoredToken } from '@/utils/jwt';
import { createBookingAction } from '../../../(dashboardGroup)/_actions/dashboard';

export default function TechnicianProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [selectedService, setSelectedService] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');
    const [message, setMessage] = useState('');

    const { data: technician, isLoading } = useQuery<TechnicianProfile>({
        queryKey: ['technician-detail', resolvedParams.id],
        queryFn: () => fetcher(`/technician/${resolvedParams.id}`),
    });

    const bookMutation = useMutation({
        mutationFn: async () => {
            const token = getStoredToken();
            if (!token) throw new Error('You must be logged in to book a service');
            return createBookingAction(token, {
                technicianProfileId: resolvedParams.id,
                serviceId: selectedService,
                scheduledAt,
            });
        },
        onSuccess: (res: { success: boolean; error?: string }) => {
            if (res.success) setMessage('Booking request submitted successfully!');
            else setMessage(`Error: ${res.error || 'Something went wrong'}`);
        },
    });

    if (isLoading) return <div className="p-8 text-center text-sm">Loading profile...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
                <h1 className="text-2xl font-bold">{technician?.user?.name || 'Technician Profile'}</h1>
                <p className="text-sm text-slate-600">{technician?.bio || 'No bio available.'}</p>
                <div className="text-xs text-slate-500">Location: {technician?.location}</div>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold">Book This Technician</h2>
                {message && <div className="p-3 text-xs bg-slate-100 rounded-lg">{message}</div>}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        bookMutation.mutate();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-xs font-semibold mb-1">Select Service</label>
                        <select
                            required
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">-- Choose Service --</option>
                            {technician?.services?.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.title} (${s.price})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Date & Time</label>
                        <input
                            type="datetime-local"
                            required
                            value={scheduledAt}
                            onChange={(e) => setScheduledAt(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg">
                        Submit Booking
                    </button>
                </form>
            </div>
        </div>
    );
}