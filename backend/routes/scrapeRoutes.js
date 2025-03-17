const express = require('express');
const router = express.Router();
const { scrapeData } = require('../controllers/scrapeController');

router.post('/scrape', scrapeData);

module.exports = router;
