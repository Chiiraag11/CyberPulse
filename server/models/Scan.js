const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    riskScore: Number,
    sslValid: Boolean,
    status: String,
    results: Object,
    // Legacy field kept for backward-compat with existing records
    timestamp: { type: Date },
  },
  { timestamps: true }  // adds createdAt + updatedAt automatically
);

module.exports = mongoose.model('Scan', scanSchema);
