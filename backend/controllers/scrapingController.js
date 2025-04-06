const { runScraper } = require('../scripts/js/scraperInvoker');

const triggerScraper = async (req, res) => {
    try {
        const data = await runScraper();
        res.status(200).json({ message: 'Scraping completed', data });
    } catch (error) {
        console.error('Scraping error:', error.message);
        res.status(500).json({ message: 'Scraping failed', error: error.message });
    }
};

module.exports = { triggerScraper };
