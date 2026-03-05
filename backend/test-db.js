const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:nkKxJlLosrgifszMZrrNpEVJvpWQiuWE@mainline.proxy.rlwy.net:16497/railway',
});

async function main() {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Successfully connected to Railway database!');
        const res = await client.query('SELECT NOW()');
        console.log('Current time from DB:', res.rows[0]);
    } catch (err) {
        console.error('Connection error:', err.message);
    } finally {
        await client.end();
    }
}

main();
