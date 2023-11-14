require("dotenv").config();

const { getConnection } = require("./db");

async function connectCreate() {
  let connection;
  try {
    connection = await getConnection();
    /// Borramos la tabla si existe
    await connection.query(`DROP TABLE IF EXISTS likes`);
    await connection.query(`DROP TABLE IF EXISTS opinions`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    //Creamos tablas
    await connection.query(`CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(25) NOT NULL, 
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);`);
    await connection.query(`CREATE TABLE opinions(
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  titulo VARCHAR(100), 
  text TINYTEXT NOT NULL,
  cantidad_likes INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`);

    await connection.query(`CREATE TABLE likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  opinion_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (opinion_id) REFERENCES opinions(id) ON DELETE CASCADE
)`);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { connectCreate };
