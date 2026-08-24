import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 space-y-4">
      <h1 className="text-3xl font-bold text-rose-600">Payment Cancelled</h1>
      <p className="text-sm text-slate-600">The transaction was not completed.</p>
      <Link href="/dashboard" className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg">
        Return to Dashboard
      </Link>
    </div>
  );
}