import { BookingStatus } from "@/lib/types";
import { revalidatePath } from "next/cache";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Create Booking 
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

    revalidatePath('/dashboard');
    return { success: true, booking: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Server connection failed';
    return { success: false, error: errorMessage };
  }
}

// Update Booking Status
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

    revalidatePath('/author-dashboard');
    revalidatePath('/admin-dashboard');
    return { success: true, booking: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Server connection failed';
    return { success: false, error: errorMessage };
  }
}

// Create Technicians
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

    revalidatePath('/admin-dashboard');
    revalidatePath('/author-dashboard');
    return { success: true, technician: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Server connection failed';
    return { success: false, error: errorMessage };
  }
}

// create payment session 
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
    const errorMessage = err instanceof Error ? err.message : 'Server connection failed';
    return { success: false, error: errorMessage };
  }
}