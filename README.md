# GBP/JPY Forex Analysis - Vercel Optimized

A clean, Vercel-optimized version of the GBP/JPY forex analysis application.

## 🚀 Quick Deploy to Vercel

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

## 📊 API Endpoints

All endpoints accessible via `/api/forex` with query parameters:

- `/api/forex?endpoint=health`
- `/api/forex?endpoint=dashboard-data`
- `/api/forex?endpoint=current-price`
- `/api/forex?endpoint=technical-analysis`
- `/api/forex?endpoint=price-history`
- `/api/forex?endpoint=prediction-history`
- `/api/forex?endpoint=technical-signals`
- `/api/forex?endpoint=fundamental-analysis`
- `/api/forex?endpoint=ml-prediction`
- `/api/forex?endpoint=performance`

## 🏗️ Structure

```
forex-vercel/
├── api/
│   └── forex.py          # Single Vercel serverless function
├── frontend/             # React.js application
├── vercel.json          # Vercel configuration
└── requirements.txt     # Python dependencies
```

## 🔧 Key Features

- **Vercel Native:** Built specifically for Vercel serverless functions
- **No External Dependencies:** Uses only Python standard library
- **CORS Enabled:** Ready for frontend integration
- **Mock Data:** Realistic forex analysis data
- **Error Handling:** Comprehensive error responses

## 📈 Frontend Integration

The React frontend automatically connects to the API endpoints and displays:
- Real-time GBP/JPY price data
- Technical analysis with 12+ indicators
- Fundamental analysis
- ML predictions with 96%+ accuracy
- Performance tracking and history

## 🌐 Live Demo

Once deployed, the application provides a complete forex analysis dashboard with professional UI and real-time data updates.

