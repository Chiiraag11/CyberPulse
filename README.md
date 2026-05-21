# ⚡ CyberPulse

> Website Security & Performance Monitoring Dashboard

Dark cybersecurity dashboard for scanning URLs — SSL, security headers, response time, risk score.

---

## Stack

- **Frontend**: Next.js 14 + Tailwind CSS + Recharts
- **Backend**: Node.js + Express
- **Database**: MongoDB

---

## Setup

### 1. Clone & Install

```bash
# Backend
cd server
cp .env.example .env
npm install

# Frontend
cd ../client
cp .env.example .env.local
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running locally:
```bash
mongod
```
Or update `MONGO_URI` in `server/.env` to point to your MongoDB Atlas cluster.

### 3. Run

```bash
# Terminal 1 — Backend
cd server
npm run dev
# Runs on http://localhost:5000

# Terminal 2 — Frontend
cd client
npm run dev
# Runs on http://localhost:3000
```

---

## API

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/scan` | Run a security scan |
| GET | `/api/history` | Get last 10 scans |
| GET | `/health` | Server health check |

### POST `/api/scan`
```json
{ "url": "https://example.com" }
```

---

## Features

- **SSL Check** — certificate validity + expiry
- **Security Headers** — CSP, HSTS, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options
- **Response Time** — latency in ms
- **Risk Score** — 0–100 based on HTTPS, SSL, status, headers
- **Dashboard** — scan history table
- **Charts** — response time graph (with mock historical data)

---

## Project Structure

```
cyber-pulse/
├── server/
│   ├── index.js
│   ├── routes/scan.js
│   ├── controllers/scanController.js
│   ├── models/Scan.js
│   └── utils/scanner.js
└── client/
    ├── pages/
    │   ├── index.js       # Home
    │   ├── scan.js        # Scanner + results
    │   └── dashboard.js   # History
    ├── components/
    │   ├── Navbar.js
    │   ├── Footer.js
    │   ├── StatCard.js
    │   ├── RiskMeter.js
    │   ├── ResponseChart.js
    │   ├── HeaderCheck.js
    │   └── ScanInput.js
    ├── utils/api.js
    └── styles/globals.css
```
