import mysql from "mysql2/promise";
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log("Conexión a la base de datos exitosa.");
        return connection;
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error.message);
        process.exit(1);
    }
};
