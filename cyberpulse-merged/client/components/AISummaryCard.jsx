export default function AISummaryCard({ summary }) {
  if (!summary) return null;
  return (
    <div className="relative mt-6 rounded-xl border border-neon/30 bg-card p-5 shadow-[0_0_20px_rgba(0,255,136,0.08)]">
      <div className="absolute -top-3 left-4 bg-dark px-2 text-xs font-mono text-neon tracking-widest uppercase">
        ⚡ AI Security Analysis
      </div>
      <p className="text-sm font-mono leading-relaxed text-gray-300 mt-1">{summary}</p>
    </div>
  );
}
