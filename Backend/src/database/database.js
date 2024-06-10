import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({path: './src/env/.env'});

export const connection = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

export const connectionDb = async () => {
    try {
        await connection.getConnection();
        console.log("Conexión establecida");
    } catch (error) {
        console.log("error al establecer la conexión", error);
    }
} 