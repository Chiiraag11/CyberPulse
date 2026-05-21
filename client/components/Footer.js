export default function Footer() {
  return (
    <footer className="border-t border-border mt-20 py-8 text-center text-slate-600 text-sm font-mono">
      <span className="text-neon/40">{'>'}</span> CyberPulse — Security Monitoring Dashboard &copy; {new Date().getFullYear()}
    </footer>
  );
}
