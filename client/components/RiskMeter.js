export default function RiskMeter({ score }) {
  const color = score >= 80 ? '#00ff88' : score >= 50 ? '#fbbf24' : '#f87171';
  const label = score >= 80 ? 'LOW RISK' : score >= 50 ? 'MEDIUM RISK' : 'HIGH RISK';
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="glass rounded-lg p-5 border border-border flex flex-col items-center">
      <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 self-start">Risk Score</div>
      <svg width="140" height="140" className="rotate-[-90deg]">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1a2a3a" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="mt-[-100px] flex flex-col items-center pointer-events-none" style={{ transform: 'rotate(0deg)' }}>
        <span className="text-3xl font-bold font-mono" style={{ color }}>{score}</span>
        <span className="text-xs font-mono mt-1" style={{ color }}>{label}</span>
      </div>
      <div style={{ marginTop: '60px' }} />
    </div>
  );
}
