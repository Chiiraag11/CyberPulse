import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ScanInput({ large = false }) {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleScan = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    router.push(`/scan?url=${encodeURIComponent(url.trim())}`);
  };

  return (
    <form onSubmit={handleScan} className={`flex gap-2 w-full ${large ? 'max-w-2xl' : 'max-w-lg'}`}>
      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neon/50 font-mono text-sm">{'>'}</span>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://example.com"
          className={`w-full bg-card border border-border text-slate-300 font-mono pl-8 pr-4 rounded-sm focus:outline-none focus:border-neon/40 placeholder-slate-600 transition-colors ${large ? 'py-3 text-sm' : 'py-2 text-xs'}`}
        />
      </div>
      <button
        type="submit"
        className={`bg-neon/10 border border-neon/30 text-neon font-mono hover:bg-neon/20 transition-colors rounded-sm whitespace-nowrap ${large ? 'px-6 py-3 text-sm' : 'px-4 py-2 text-xs'}`}
      >
        SCAN
      </button>
    </form>
  );
}
