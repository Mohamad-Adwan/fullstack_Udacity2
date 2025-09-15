import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL or TEST_DATABASE_URL not set in .env');
const pool = new Pool({ connectionString });
export default pool;