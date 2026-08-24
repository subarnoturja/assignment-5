'use client';

import { use, useState } from 'react';
import { getStoredToken } from '@/utils/jwt';
import { createPaymentSessionAction } from '../../../_actions/dashboard';

export default function PaymentInitiationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    const token = getStoredToken();

    if (!token) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const res = await createPaymentSessionAction(token, resolvedParams.id);
    if (res.success && res.checkoutUrl) {
      window.location.href = res.checkoutUrl;
    } else {
      setError(res.error || 'Payment setup failed.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded-2xl p-6 text-center space-y-4 shadow-sm">
      <h2 className="text-xl font-bold">Stripe Payment Gateway</h2>
      <p className="text-xs text-slate-500">You will be redirected to complete your payment.</p>

      {error && <div className="p-3 text-xs bg-red-50 text-red-600 rounded-lg">{error}</div>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? 'Connecting to Stripe...' : 'Proceed to Checkout'}
      </button>
    </div>
  );
}