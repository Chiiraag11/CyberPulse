const ALL_HEADERS = [
  { key: 'content-security-policy', label: 'Content-Security-Policy' },
  { key: 'x-frame-options', label: 'X-Frame-Options' },
  { key: 'strict-transport-security', label: 'Strict-Transport-Security' },
  { key: 'x-xss-protection', label: 'X-XSS-Protection' },
  { key: 'x-content-type-options', label: 'X-Content-Type-Options' },
];

export default function HeaderCheck({ missing = [], present = [] }) {
  return (
    <div className="glass rounded-lg p-5 border border-border">
      <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Security Headers</div>
      <div className="space-y-2">
        {ALL_HEADERS.map(h => {
          const ok = present.includes(h.key);
          return (
            <div key={h.key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-sm font-mono text-slate-400">{h.label}</span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${ok ? 'bg-neon/10 text-neon border border-neon/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {ok ? '✓ PRESENT' : '✗ MISSING'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
