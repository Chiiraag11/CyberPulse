export default function StatCard({ label, value, sub, accent = 'neon', icon }) {
  const colors = {
    neon: 'border-neon/20 text-neon',
    cyan: 'border-cyan/20 text-cyan',
    red: 'border-red-500/20 text-red-400',
    yellow: 'border-yellow-500/20 text-yellow-400',
  };
  return (
    <div className={`glass rounded-lg p-5 border ${colors[accent]} relative overflow-hidden`}>
      <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">{label}</div>
      <div className={`text-2xl font-bold font-mono ${colors[accent].split(' ')[1]}`}>{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
      {icon && <div className="absolute top-4 right-4 text-2xl opacity-20">{icon}</div>}
    </div>
  );
}
