import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const {Pool} = pg;
export const poolDB = new Pool({
    //connectionString: process.env.DATABASE_URL
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD!,
    database: process.env.DATABASE
});