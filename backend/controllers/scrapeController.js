const axios = require('axios');
const { FLASK_API_URL } = require('../config/config');

exports.scrapeData = async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.post(`${FLASK_API_URL}/scrape`, { url });
    res.json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Error scraping data' });
  }
};
