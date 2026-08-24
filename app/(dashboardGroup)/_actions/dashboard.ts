'use server';

import { BookingStatus } from '@/lib/types';

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export async function createBookingAction(
  token: string,
  payload: { technicianProfileId: string; serviceId: string; scheduledAt: string }
) {
  try {
    const res = await fetch(`${BACKEND_BASE}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, error: data.message };

    return { success: true, booking: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Booking creation failed';
    return { success: false, error: errorMessage };
  }
}

export async function updateBookingStatusAction(
  token: string,
  bookingId: string,
  status: BookingStatus
) {
  try {
    const res = await fetch(`${BACKEND_BASE}/technician/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, error: data.message };

    return { success: true, booking: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Status update failed';
    return { success: false, error: errorMessage };
  }
}

export async function createTechnicianAction(
  token: string,
  payload: {
    userId?: string;
    bio: string;
    skills: string[];
    hourlyRate: number;
    location: string;
  }
) {
  try {
    const res = await fetch(`${BACKEND_BASE}/technician`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, error: data.message };

    return { success: true, technician: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to create technician profile';
    return { success: false, error: errorMessage };
  }
}

export async function createPaymentSessionAction(token: string, bookingId: string) {
  try {
    const res = await fetch(`${BACKEND_BASE}/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId }),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, error: data.message };

    return { success: true, checkoutUrl: data.checkoutUrl };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Payment setup failed';
    return { success: false, error: errorMessage };
  }
}

export async function toggleUserStatusAction(
  token: string,
  userId: string,
  status: 'ACTIVE' | 'BANNED'
) {
  try {
    const res = await fetch(`${BACKEND_BASE}/admin/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, error: data.message };

    return { success: true, user: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'User status update failed';
    return { success: false, error: errorMessage };
  }
}

export async function createCategoryAction(token: string, name: string, description?: string) {
  try {
    const res = await fetch(`${BACKEND_BASE}/admin/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, error: data.message };

    return { success: true, category: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Category creation failed';
    return { success: false, error: errorMessage };
  }
}