const { connectToDatabase } = require('../lib/db-utils');

async function testConnection() {
    console.log('Testing DB Connection...');
    try {
        const { client, db } = await connectToDatabase();
        console.log('Successfully connected to DB:', db.databaseName);

        // List collections
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        await client.close();
        console.log('Connection closed.');
    } catch (error) {
        console.error('DB Connection Failed:', error);
        process.exit(1);
    }
}

testConnection();
