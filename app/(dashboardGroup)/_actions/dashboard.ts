import { revalidatePath } from "next/cache";

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

    revalidatePath('/dashboard');
    return { success: true, booking: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Server connection failed';
    return { success: false, error: errorMessage };
  }
}