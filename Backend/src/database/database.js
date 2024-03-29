import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({path: './src/env/.env'});

export const connection = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
})

export const connectionDb = async () => {
    try {
        await connection.getConnection();
        console.log("Conexión establecida");
    } catch (error) {
        console.log("error al establecer la conexión", error);
    }
} 