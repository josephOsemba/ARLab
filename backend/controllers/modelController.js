const axios = require('axios');
const { FLASK_API_URL } = require('../config/config');

exports.getAIResponse = async (req, res) => {
  try {
    const { question } = req.body;
    const response = await axios.post(`${FLASK_API_URL}/generate-response`, { question });
    res.json({ response: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching AI response' });
  }
};
