import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 space-y-4">
      <h1 className="text-4xl font-extrabold text-slate-800">404</h1>
      <p className="text-slate-600 text-sm">Page Not Found</p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">
        Return Home
      </Link>
    </div>
  );
}