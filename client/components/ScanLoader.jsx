import { useEffect, useState } from 'react';

const STEPS = [
  'Initializing scan...',
  'Checking SSL...',
  'Analyzing headers...',
  'Measuring latency...',
  'Calculating risk score...',
];

export default function ScanLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="mt-6 rounded-xl border border-cyan/20 bg-card p-5 font-mono text-sm">
      <div className="mb-3 text-cyan text-xs tracking-widest uppercase">[ Scan in Progress ]</div>
      {STEPS.map((s, i) => (
        <div
          key={s}
          className={`flex items-center gap-2 py-0.5 transition-opacity duration-300 ${
            i > step ? 'opacity-20' : 'opacity-100'
          }`}
        >
          <span className={i < step ? 'text-neon' : i === step ? 'text-cyan animate-pulse' : 'text-gray-600'}>
            {i < step ? '✓' : i === step ? '▶' : '○'}
          </span>
          <span className={i === step ? 'text-cyan' : i < step ? 'text-gray-400' : 'text-gray-600'}>{s}</span>
        </div>
      ))}
    </div>
  );
}
