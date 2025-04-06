const { spawn } = require('child_process');
const path = require('path');

const runScraper = () => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../../scrapper/scraper.py');
        const pythonProcess = spawn('python', [scriptPath]);

        let data = '';
        let error = '';

        pythonProcess.stdout.on('data', (chunk) => {
            data += chunk.toString();
        });

        pythonProcess.stderr.on('data', (chunk) => {
            error += chunk.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(new Error(`Scraper exited with code ${code} and error: ${error}`));
            }
        });
    });
};

module.exports = { runScraper };
