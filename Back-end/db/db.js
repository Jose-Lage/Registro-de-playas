const mysql = require("mysql2/promise");
require("dotenv").config({ path: "../.env" });
const { HOST, DBUSER, DATABASE, PASSWORD } = process.env;

let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: HOST,
      user: DBUSER,
      database: DATABASE,
      password: PASSWORD,
      timezone: "Z",
    });
  }

  return await pool.getConnection();
};
module.exports = { getConnection };
