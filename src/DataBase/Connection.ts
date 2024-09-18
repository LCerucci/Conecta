import dotenv from 'dotenv';
import { Connection, ResultSetHeader } from 'mysql2/promise';
import { createPool, Pool } from 'mysql2/promise';

dotenv.config();

const host: string = process.env.HOST as string;
const user: string = process.env.USER as string;
const password: string = process.env.PASSWORD as string;
const dataBase: string = process.env.DATA_BASE as string; 

const conn: Pool = createPool({
    host: "localhost",
    user: "dev",
    password: "rootLucas123@",
    database:"Conecta"
});

export class DataBase{
    pool: Pool = conn;

    constructor(){
    }

    async executeSelection(fn: (connection: Connection) => Promise<any>): Promise<any | null>{
        const connection = await this.pool.getConnection();

        try{
            const result = await fn(connection);
            return result;

        }catch(err){
            console.log(err);
            return null;

        }finally{
            connection.release();
        }
    }

    async executeBoolTransaction(fn: (connection: Connection) => Promise<any>): Promise<any| boolean>{
        const connection = await this.pool.getConnection();

        try{
            await connection.beginTransaction();

            const result: ResultSetHeader = await fn(connection);

                await connection.commit();
                return result

        }catch(err){
            connection.rollback();
            console.log(err);
            return false;

        }finally{
            connection.release();
        }
    }
}