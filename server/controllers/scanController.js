const { scanUrl } = require('../utils/scanner');
const Scan = require('../models/Scan');

exports.runScan = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  try {
    const results = await scanUrl(url);
    try {
      await Scan.create({
        url: results.url,
        riskScore: results.riskScore,
        sslValid: results.ssl?.valid ?? false,
        status: results.httpStatus ? String(results.httpStatus) : 'unknown',
        results,
      });
    } catch {}
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const scans = await Scan.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('-results');
    res.json(scans);
  } catch {
    res.json([]);
  }
};
