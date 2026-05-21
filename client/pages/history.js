import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function riskColor(score) {
  if (score <= 30) return 'text-neon';
  if (score <= 60) return 'text-yellow-400';
  return 'text-red-400';
}

export default function HistoryPage() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API}/api/history`)
      .then((r) => r.json())
      .then((data) => { setScans(data); setLoading(false); })
      .catch(() => { setError('Failed to load history.'); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-mono px-4 py-10"
      style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a2a3a 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-sans font-bold text-neon tracking-wide">Scan History</h1>
          <Link href="/" className="text-xs text-cyan border border-cyan/30 px-3 py-1 rounded hover:bg-cyan/10 transition">← Back</Link>
        </div>

        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {!loading && !error && scans.length === 0 && (
          <p className="text-gray-500 text-sm">No scans found.</p>
        )}

        {scans.length > 0 && (
          <div className="space-y-3">
            {scans.map((scan, i) => (
              <div key={i} className="rounded-xl border border-border bg-card px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:border-cyan/30 transition">
                <div>
                  <div className="text-sm text-white truncate max-w-xs">{scan.url}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{new Date(scan.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className={`font-bold text-sm ${riskColor(scan.riskScore)}`}>
                    Risk: {scan.riskScore ?? '—'}
                  </span>
                  <span className={`px-2 py-0.5 rounded border text-xs ${scan.sslValid ? 'border-neon/30 text-neon' : 'border-red-400/30 text-red-400'}`}>
                    SSL {scan.sslValid ? 'Valid' : 'Invalid'}
                  </span>
                  {scan.status && (
                    <span className="text-gray-500">{scan.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
