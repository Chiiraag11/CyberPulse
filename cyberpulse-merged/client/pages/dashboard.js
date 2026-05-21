import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScanInput from '../components/ScanInput';
import { getHistory } from '../utils/api';

function ScoreBar({ score }) {
  const color = score >= 80 ? '#00ff88' : score >= 50 ? '#fbbf24' : '#f87171';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-border rounded-full h-1.5">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-xs font-mono w-8 text-right" style={{ color }}>{score}</span>
    </div>
  );
}

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  const avgRisk = history.length
    ? Math.round(history.reduce((s, h) => s + (h.riskScore || 0), 0) / history.length)
    : null;

  return (
    <div
      className="min-h-screen grid-bg"
      style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a2a3a 1px, transparent 0)', backgroundSize: '32px 32px' }}
    >
      <Navbar />
      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-cyan font-mono">{'>'}</span> Dashboard
          </h1>
          <ScanInput />
        </div>

        {/* Summary Stats */}
        {history.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="glass rounded-lg border border-border p-4 hover:border-cyan/40 hover:shadow-[0_0_16px_rgba(0,229,255,0.08)] transition">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Total Scans</p>
              <p className="text-2xl font-bold text-neon">{history.length}</p>
            </div>
            <div className="glass rounded-lg border border-border p-4 hover:border-cyan/40 hover:shadow-[0_0_16px_rgba(0,229,255,0.08)] transition">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Avg Risk Score</p>
              <p className="text-2xl font-bold" style={{ color: avgRisk >= 80 ? '#00ff88' : avgRisk >= 50 ? '#fbbf24' : '#f87171' }}>
                {avgRisk ?? '—'}
              </p>
            </div>
            <div className="glass rounded-lg border border-border p-4 hover:border-cyan/40 hover:shadow-[0_0_16px_rgba(0,229,255,0.08)] transition">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">SSL Valid</p>
              <p className="text-2xl font-bold text-neon">
                {history.filter(h => h.sslValid).length}/{history.length}
              </p>
            </div>
          </div>
        )}

        <div className="glass rounded-lg border border-border overflow-hidden shadow-[0_0_32px_rgba(0,255,136,0.05)]">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-neon rounded-full" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Recent Scans</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-600 font-mono text-sm">Loading...</div>
          ) : history.length === 0 ? (
            <div className="p-12 text-center text-slate-600 font-mono text-sm">
              No scans yet. Run your first scan above.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['URL', 'Scanned', 'Risk Score', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-mono text-slate-500 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((s, i) => {
                  const risk = s.riskScore;
                  const statusColor = risk >= 80 ? 'text-neon' : risk >= 50 ? 'text-yellow-400' : 'text-red-400';
                  const statusLabel = risk >= 80 ? 'Low Risk' : risk >= 50 ? 'Medium' : 'High Risk';
                  const scannedAt = s.createdAt || s.timestamp;
                  return (
                    <tr key={s._id || i} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 font-mono text-cyan text-xs truncate max-w-[200px]">{s.url}</td>
                      <td className="px-5 py-3 text-slate-500 font-mono text-xs">
                        {scannedAt ? new Date(scannedAt).toLocaleString() : '—'}
                      </td>
                      <td className="px-5 py-3 w-40">
                        <ScoreBar score={risk} />
                      </td>
                      <td className={`px-5 py-3 font-mono text-xs ${statusColor}`}>{statusLabel}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
