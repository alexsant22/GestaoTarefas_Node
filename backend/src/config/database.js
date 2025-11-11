import mysql from "mysql2";
import config from "./config.js";

const dbConfig = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Criar pool de conexões
const pool = mysql.createPool(dbConfig);

// Promisify para usar async/await
const promisePool = pool.promise();

export default promisePool;
