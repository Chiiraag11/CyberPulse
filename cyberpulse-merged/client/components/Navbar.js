import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="glass fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-sm bg-neon/20 border border-neon/40 flex items-center justify-center">
          <span className="text-neon text-xs font-mono font-bold">CP</span>
        </div>
        <span className="font-sans font-800 text-white text-lg tracking-tight">
          Cyber<span className="text-neon">Pulse</span>
        </span>
      </Link>
      <div className="flex items-center gap-6 text-sm text-slate-400">
        <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
        <Link href="/dashboard" className="hover:text-cyan transition-colors">Dashboard</Link>
        <Link href="/history" className="hover:text-cyan transition-colors">History</Link>
        <Link href="/scan" className="bg-neon/10 border border-neon/30 text-neon px-4 py-1.5 rounded-sm hover:bg-neon/20 transition-colors font-mono text-xs">
          SCAN NOW
        </Link>
      </div>
    </nav>
  );
}
