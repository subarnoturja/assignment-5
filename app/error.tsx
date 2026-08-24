'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 space-y-4">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-xs text-slate-500">{error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">
        Try Again
      </button>
    </div>
  );
}