export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-400 py-8 mt-12 text-sm">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-white font-bold">FixItNow Platform</p>
          <p className="text-xs">Your Trusted Home Service Marketplace</p>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} FixItNow. All rights reserved.</p>
      </div>
    </footer>
  );
}