const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const modelRoutes = require('./routes/modelRoutes');
const scrapeRoutes = require('./routes/scrapeRoutes');

app.use('/api/model', modelRoutes);
app.use('/api/scrape', scrapeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
