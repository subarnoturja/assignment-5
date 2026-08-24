import { BookingStatus } from '@/lib/types';

export default function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    [BookingStatus.REQUESTED]: 'bg-amber-100 text-amber-800 border-amber-300',
    [BookingStatus.ACCEPTED]: 'bg-blue-100 text-blue-800 border-blue-300',
    [BookingStatus.DECLINED]: 'bg-red-100 text-red-800 border-red-300',
    [BookingStatus.PAID]: 'bg-purple-100 text-purple-800 border-purple-300',
    [BookingStatus.IN_PROGRESS]: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    [BookingStatus.COMPLETED]: 'bg-slate-100 text-slate-800 border-slate-300',
    [BookingStatus.CANCELLED]: 'bg-rose-100 text-rose-800 border-rose-300',
  };

  return (
    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
}