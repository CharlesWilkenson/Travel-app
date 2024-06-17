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
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
}).promise();



// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
//const [rows] = await connection.query("SELECT * from trip");
//console.log(rows)

//export const connection = mysql.createPool({

//connection.getConnection(function(err, connection) {
// if (err) throw err; // not connected!
 
  // Use the connection
 // connection.query('SELECT * from trip', function (error, results, fields) {
    // When done with the connection, release it.
   // connection.release();
 
    // Handle error after the release.
   // if (error) throw error;
 
    // Don't use the connection here, it has been returned to the pool.
///  });
//});