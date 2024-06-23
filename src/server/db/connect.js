import dotenv from 'dotenv';

dotenv.config();
import mysql from 'mysql2';


export const connection = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    debug: false,
    waitForConnections: true,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
}).promise();
