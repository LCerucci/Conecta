import dotenv from 'dotenv';
import { createPool, Pool } from 'mysql2/promise';

dotenv.config();

const host: string = process.env.HOST as string;
const user: string = process.env.USER as string;
const password: string = process.env.PASSWORD as string;
const name: string = process.env.NAME as string; 

export const conn: Pool = createPool({
    host: host,
    user: user,
    password: password,
    database: name,
});