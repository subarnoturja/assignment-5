import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 space-y-4">
      <h1 className="text-3xl font-bold text-emerald-600">Payment Successful</h1>
      <p className="text-sm text-slate-600">Your booking is confirmed and paid.</p>
      <Link href="/dashboard" className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg">
        Go to Dashboard
      </Link>
    </div>
  );
}