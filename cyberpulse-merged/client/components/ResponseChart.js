import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MOCK_DATA = [
  { t: '10m ago', ms: 312 }, { t: '8m ago', ms: 289 }, { t: '6m ago', ms: 340 },
  { t: '4m ago', ms: 271 }, { t: '2m ago', ms: 310 }, { t: 'now', ms: null },
];

export default function ResponseChart({ currentMs }) {
  const data = MOCK_DATA.map((d, i) =>
    i === MOCK_DATA.length - 1 ? { ...d, ms: currentMs || 295 } : d
  );

  return (
    <div className="glass rounded-lg p-5 border border-border">
      <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Response Time (ms)</div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid stroke="#1a2a3a" strokeDasharray="4 4" />
          <XAxis dataKey="t" tick={{ fill: '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#0d1521', border: '1px solid #1a2a3a', borderRadius: 4, fontFamily: 'JetBrains Mono', fontSize: 11 }}
            labelStyle={{ color: '#00e5ff' }}
            itemStyle={{ color: '#00ff88' }}
          />
          <Line type="monotone" dataKey="ms" stroke="#00ff88" strokeWidth={2} dot={{ fill: '#00ff88', r: 3 }}
            activeDot={{ r: 5, fill: '#00e5ff' }}
            style={{ filter: 'drop-shadow(0 0 4px #00ff88)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
