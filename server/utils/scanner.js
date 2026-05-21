const fetch = require('node-fetch');
const https = require('https');
const { URL } = require('url');
const dns = require('dns').promises;

const SECURITY_HEADERS = [
  'content-security-policy',
  'x-frame-options',
  'strict-transport-security',
  'x-xss-protection',
  'x-content-type-options',
];

async function checkSSL(hostname) {
  return new Promise((resolve) => {
    const options = { host: hostname, port: 443, method: 'GET', rejectUnauthorized: true };
    const req = https.request(options, (res) => {
      const cert = res.socket.getPeerCertificate();
      if (!cert || !cert.valid_to) return resolve({ valid: false, expires: null });
      const expires = new Date(cert.valid_to);
      resolve({ valid: expires > new Date(), expires: cert.valid_to, subject: cert.subject?.CN });
    });
    req.on('error', () => resolve({ valid: false, expires: null }));
    req.end();
  });
}

async function scanUrl(rawUrl) {
  const normalizedUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
  const parsed = new URL(normalizedUrl);
  const hostname = parsed.hostname;

  const start = Date.now();
  let httpStatus = null;
  let headers = {};
  let responseTime = null;

  try {
    const res = await fetch(normalizedUrl, { timeout: 8000 });
    responseTime = Date.now() - start;
    httpStatus = res.status;
    headers = Object.fromEntries(res.headers.entries());
  } catch (e) {
    responseTime = Date.now() - start;
  }

  const isHttps = parsed.protocol === 'https:';
  const ssl = isHttps ? await checkSSL(hostname) : { valid: false, expires: null };

  let dnsResolved = false;
  try {
    await dns.lookup(hostname);
    dnsResolved = true;
  } catch {}

  const missingHeaders = SECURITY_HEADERS.filter(h => !headers[h]);
  const presentHeaders = SECURITY_HEADERS.filter(h => !!headers[h]);

  let riskScore = 100;
  if (!isHttps) riskScore -= 30;
  if (!ssl.valid) riskScore -= 20;
  if (!httpStatus || httpStatus >= 400) riskScore -= 20;
  riskScore -= missingHeaders.length * 5;

  return {
    url: normalizedUrl,
    hostname,
    httpStatus,
    responseTime,
    isHttps,
    ssl,
    dnsResolved,
    missingHeaders,
    presentHeaders,
    riskScore: Math.max(0, riskScore),
  };
}

module.exports = { scanUrl };
