const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(morgan('dev'));

// Routes
const scrapingRoutes = require('./routes/scrapingRoutes');
const modelRoutes = require('./routes/modelRoutes');         // For 3D model handling
const analyticsRoutes = require('./routes/analyticsRoutes'); // For analytics
const dataRoutes = require('./routes/dataRoutes');           // For storing scraped/training data

// Route mounting
app.use('/api/scraping', scrapingRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/data', dataRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('ARLab-PAS Backend is running ✅');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
