// Generates a plain-English AI security summary from scan results.
// Adapted to match the scanner's actual output shape:
//   url, isHttps, ssl.valid, ssl.expires, missingHeaders[], responseTime, riskScore (0–100, higher = safer)

export function generateAISummary(scanData) {
  const { url, isHttps, ssl = {}, missingHeaders = [], responseTime, riskScore } = scanData;
  const issues = [];
  const positives = [];

  if (isHttps) positives.push('HTTPS is enabled');
  else issues.push('site is not using HTTPS');

  if (ssl.valid) positives.push('SSL certificate is valid');
  else if (ssl.valid === false) issues.push('SSL certificate is invalid or expired');

  const missing = Array.isArray(missingHeaders) ? missingHeaders : [];
  if (missing.includes('content-security-policy')) issues.push('CSP header is missing');
  if (missing.includes('strict-transport-security')) issues.push('HSTS header is absent');
  if (missing.includes('x-frame-options')) issues.push('X-Frame-Options is not set');
  if (missing.includes('x-content-type-options')) issues.push('X-Content-Type-Options missing');

  if (responseTime > 1000) issues.push(`high response latency (${responseTime}ms)`);

  // riskScore: 0–100 where higher = safer
  let posture = 'moderate';
  if (riskScore >= 80) posture = 'good';
  else if (riskScore <= 40) posture = 'poor';

  let summary = '';
  if (issues.length === 0 && positives.length > 0) {
    summary = `Security posture is ${posture}. ${positives.join(', ')}. No major issues detected.`;
  } else if (issues.length > 0 && positives.length > 0) {
    summary = `${positives.join(', ')}, but ${issues.join(', ')}. Overall security posture is ${posture}.`;
  } else {
    summary = `Multiple issues detected: ${issues.join(', ')}. Immediate hardening is recommended.`;
  }

  return summary.charAt(0).toUpperCase() + summary.slice(1) + '.';
}
