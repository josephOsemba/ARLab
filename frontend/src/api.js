import axios from 'axios';

// Axios instance for base configuration
const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to scrape a website
export const scrapeWebsite = async (url) => {
  try {
    const response = await instance.post('/scraper', { url }); // Adjusted to match your backend route
    return response.data;
  } catch (error) {
    console.error('Scraping Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Failed to scrape the webpage');
  }
};

// Function to train the model
export const trainModel = async () => {
  try {
    const response = await instance.post('/models/train');
    return response.data;
  } catch (error) {
    console.error('Training Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Failed to train the model');
  }
};

// Function to ask a question using the model
export const askQuestion = async (question) => {
  try {
    const response = await instance.post('/models/ask', { question });
    return response.data;
  } catch (error) {
    console.error('Question Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Failed to get an answer');
  }
};

export default instance;