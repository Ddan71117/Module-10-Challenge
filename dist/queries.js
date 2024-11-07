import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;
const queryDatabase = async (query) => {
    const pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        host: 'localhost',
        database: 'employee_db',
        port: 5432,
    });
    try {
        await pool.connect();
        console.log('Connected to database.');
    }
    catch (err) {
        console.error('Error connecting to database.', err);
    }
    finally {
        await pool.end();
    }
};
export default queryDatabase;
