import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'shopping_api',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'admin',
  port: Number(process.env.DB_PORT) || 5432
});

export default pool;
