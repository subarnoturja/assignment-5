import Link from 'next/link';
import { Wrench, ShieldCheck, Clock } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 py-12">
      <section className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Your Trusted Home Service Platform
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Connect with certified technicians for instant repairs, plumbing, and electrical services.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/services"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-sm"
          >
            Explore Services
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border rounded-2xl p-6 text-center space-y-2 shadow-sm">
          <ShieldCheck className="h-8 w-8 text-blue-600 mx-auto" />
          <h3 className="font-bold text-base">Verified Professionals</h3>
          <p className="text-xs text-slate-500">All technicians are vetted for quality and trust.</p>
        </div>
        <div className="bg-white border rounded-2xl p-6 text-center space-y-2 shadow-sm">
          <Clock className="h-8 w-8 text-blue-600 mx-auto" />
          <h3 className="font-bold text-base">Instant Scheduling</h3>
          <p className="text-xs text-slate-500">Pick time slots that fit seamlessly into your day.</p>
        </div>
        <div className="bg-white border rounded-2xl p-6 text-center space-y-2 shadow-sm">
          <Wrench className="h-8 w-8 text-blue-600 mx-auto" />
          <h3 className="font-bold text-base">Guaranteed Repairs</h3>
          <p className="text-xs text-slate-500">Full satisfaction guaranteed on all completed tasks.</p>
        </div>
      </section>
    </div>
  );
}