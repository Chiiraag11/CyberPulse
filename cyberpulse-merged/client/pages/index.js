import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScanInput from '../components/ScanInput';

const FEATURES = [
  { icon: '🔒', title: 'SSL Analysis', desc: 'Validate certificate chain, expiry, and HTTPS enforcement.' },
  { icon: '⚡', title: 'Response Time', desc: 'Measure latency and track performance over time.' },
  { icon: '🛡️', title: 'Security Headers', desc: 'Check CSP, HSTS, X-Frame-Options, and more.' },
  { icon: '📊', title: 'Risk Score', desc: 'Instant 0–100 risk score based on security posture.' },
];

export default function Home() {
  return (
    <div className="min-h-screen grid-bg">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-neon/5 border border-neon/20 px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse" />
          <span className="text-neon font-mono text-xs tracking-widest">LIVE SECURITY SCANNING</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-none tracking-tight">
          <span className="text-white">Monitor.</span>{' '}
          <span className="text-cyan" style={{ textShadow: '0 0 30px rgba(0,229,255,0.4)' }}>Analyze.</span>{' '}
          <span className="text-neon" style={{ textShadow: '0 0 30px rgba(0,255,136,0.4)' }}>Secure.</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto mb-12 text-lg">
          Real-time website security audits. Detect vulnerabilities, measure performance, and harden your web presence.
        </p>
        <div className="flex justify-center">
          <ScanInput large />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="glass rounded-lg p-5 border border-border hover:border-cyan/20 transition-colors group">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-1 group-hover:text-cyan transition-colors">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="border-t border-border py-12 px-6 text-center">
        <p className="text-slate-500 font-mono text-sm">
          <span className="text-neon">$</span> No account required — just enter a URL and scan instantly.
        </p>
      </section>

      <Footer />
    </div>
  );
}
