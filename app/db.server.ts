// db.server.ts
import pkg from 'pg';
const { Pool } = pkg;


const DB_USER = process.env.DATABASE_USER;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_HOST = process.env.DATABASE_HOST;
const DB_NAME = process.env.DATABASE_NAME;
const DB_PORT = process.env.DATABASE_PORT

// Create a new pool of connections
const pool = new Pool({
  user: DB_USER, // Your database user
  host: DB_HOST, // The host of your PostgreSQL server
  database: DB_NAME, // The name of your database
  password: DB_PASSWORD, // The password for the remix user
  port: DB_PORT, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false,
  },
});

// A function to check if the pool is already connected and get the client
export async function getDbClient() {
  try {
    const client = await pool.connect(); // Connect to the database
    console.log('Connected to the database.');
    return client; // Return the client for queries
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    throw new Error('Database connection failed');
  }
}
