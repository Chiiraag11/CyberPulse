require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const scanRoutes = require('./routes/scan');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', scanRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cyberpulse';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB error:', err.message);
    app.listen(PORT, () => console.log(`Server on port ${PORT} (no DB)`));
  });
