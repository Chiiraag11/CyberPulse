import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScanInput from '../components/ScanInput';
import StatCard from '../components/StatCard';
import RiskMeter from '../components/RiskMeter';
import ResponseChart from '../components/ResponseChart';
import HeaderCheck from '../components/HeaderCheck';
import ScanLoader from '../components/ScanLoader';
import AISummaryCard from '../components/AISummaryCard';
import { scanWebsite } from '../utils/api';
import { generateAISummary } from '../utils/aiSummary';

export default function ScanPage() {
  const router = useRouter();
  const { url } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiSummary, setAiSummary] = useState('');

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setData(null);
    setAiSummary('');
    scanWebsite(url)
      .then((result) => {
        setData(result);
        setAiSummary(generateAISummary(result));
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    doc.setFillColor(8, 13, 18);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(0, 255, 136);
    doc.setFontSize(18);
    doc.text('CyberPulse Security Report', 14, 20);

    doc.setTextColor(200, 200, 200);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

    doc.setDrawColor(26, 42, 58);
    doc.line(14, 34, 196, 34);

    const rows = [
      ['URL', data?.url ?? '—'],
      ['HTTP Status', String(data?.httpStatus ?? '—')],
      ['Risk Score', String(data?.riskScore ?? '—')],
      ['SSL Valid', data?.ssl?.valid ? 'Yes' : 'No'],
      ['SSL Expiry', data?.ssl?.expires ?? '—'],
      ['Response Time', data?.responseTime ? `${data.responseTime}ms` : '—'],
      ['Missing Headers', (data?.missingHeaders ?? []).join(', ') || 'None'],
    ];

    let y = 44;
    rows.forEach(([label, value]) => {
      doc.setTextColor(0, 229, 255);
      doc.text(label + ':', 14, y);
      doc.setTextColor(220, 220, 220);
      doc.text(String(value), 70, y);
      y += 9;
    });

    if (aiSummary) {
      y += 4;
      doc.setTextColor(0, 255, 136);
      doc.text('AI Security Summary:', 14, y);
      y += 7;
      doc.setTextColor(200, 200, 200);
      const lines = doc.splitTextToSize(aiSummary, 180);
      doc.text(lines, 14, y);
    }

    doc.save(`cyberpulse-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen grid-bg">
      <Navbar />
      <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          <span className="text-cyan font-mono">{'>'}</span> Security Scanner
        </h1>
        <div className="mb-8">
          <ScanInput />
        </div>

        {loading && <ScanLoader />}

        {error && (
          <div className="glass border border-red-500/30 rounded-lg p-6 text-red-400 font-mono text-sm">
            {'>'} Error: {error}
          </div>
        )}

        {data && (
          <div className="space-y-6">
            <div className="font-mono text-xs text-slate-500 flex items-center gap-2">
              <span className="text-neon">✓</span> Scan complete for{' '}
              <span className="text-cyan">{data.url}</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="HTTP Status"
                value={data.httpStatus || 'ERR'}
                sub={data.httpStatus === 200 ? 'Online' : 'Check site'}
                accent={data.httpStatus === 200 ? 'neon' : 'red'}
                icon="🌐"
              />
              <StatCard
                label="Response Time"
                value={`${data.responseTime}ms`}
                sub={data.responseTime < 500 ? 'Fast' : 'Slow'}
                accent={data.responseTime < 500 ? 'neon' : 'yellow'}
                icon="⚡"
              />
              <StatCard
                label="HTTPS"
                value={data.isHttps ? 'Enabled' : 'Disabled'}
                sub={data.isHttps ? 'Secure' : 'Insecure'}
                accent={data.isHttps ? 'neon' : 'red'}
                icon="🔒"
              />
              <StatCard
                label="SSL Certificate"
                value={data.ssl.valid ? 'Valid' : 'Invalid'}
                sub={data.ssl.expires ? `Expires ${new Date(data.ssl.expires).toLocaleDateString()}` : 'N/A'}
                accent={data.ssl.valid ? 'neon' : 'red'}
                icon="🏅"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <RiskMeter score={data.riskScore} />
              <div className="lg:col-span-2">
                <ResponseChart currentMs={data.responseTime} />
              </div>
            </div>

            <HeaderCheck missing={data.missingHeaders} present={data.presentHeaders} />

            {aiSummary && <AISummaryCard summary={aiSummary} />}

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 rounded-lg border border-neon/40 bg-neon/5 px-4 py-2 text-sm font-mono text-neon hover:bg-neon/10 hover:shadow-[0_0_12px_rgba(0,255,136,0.2)] transition"
            >
              ↓ Download PDF Report
            </button>
          </div>
        )}

        {!url && !loading && (
          <div className="text-center py-24 text-slate-600 font-mono text-sm">
            Enter a URL above to start scanning.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
