const scrape = require('website-scraper').default;
const path = require('path');

const options = {
    urls: [
        'https://meditationteachertraining.vercel.app/',
        'https://meditationteachertraining.vercel.app/home',
        'https://meditationteachertraining.vercel.app/login',
        'https://meditationteachertraining.vercel.app/admin',
        'https://meditationteachertraining.vercel.app/quiz'
    ],
    directory: path.join(__dirname, 'website-clone'),
    recursive: true,
    maxDepth: 3,
    request: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    }
};

console.log("Starting scraper...");

scrape(options).then((result) => {
    console.log("Website successfully downloaded to " + options.directory);
}).catch((err) => {
    console.error("An error ocurred:", err);
});
