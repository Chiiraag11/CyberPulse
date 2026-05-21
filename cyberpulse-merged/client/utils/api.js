const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function scanWebsite(url) {
  const res = await fetch(`${BASE}/api/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error('Scan failed');
  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${BASE}/api/history`);
  return res.json();
}
