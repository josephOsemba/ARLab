const express = require('express');
const { triggerScraper } = require('../controllers/scrapingController');
const router = express.Router();

router.get('/run-scraper', triggerScraper);

module.exports = router;
