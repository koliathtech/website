import pkg from 'pg';
const { Client } = pkg;

async function run() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5433,
    });

    try {
        await client.connect();
        console.log('Connected to postgres database');
        
        // Fix collation mismatch
        try {
            await client.query('ALTER DATABASE template1 REFRESH COLLATION VERSION');
            await client.query('ALTER DATABASE postgres REFRESH COLLATION VERSION');
        } catch (e) {
            console.log('Collation refresh failed (maybe already up to date or not supported):', e.message);
        }

        // Check if mydb exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname='mydb'");
        if (res.rowCount === 0) {
            console.log('mydb does not exist, creating...');
            await client.query('CREATE DATABASE mydb');
            console.log('mydb created');
        } else {
            console.log('mydb already exists');
        }

        // Try to set password
        await client.query("ALTER USER postgres WITH PASSWORD 'postgres'");
        console.log('Password reset to postgres');

        await client.end();
    } catch (err) {
        console.error('Connection error', err.stack);
        process.exit(1);
    }
}

run();
