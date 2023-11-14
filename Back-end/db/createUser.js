const bcrypt = require("bcrypt");
const { getConnection } = require("./db");
const { generateError } = require("../generateError");

const queryNewUser = async (username, email, password) => {
  let connection;
  try {
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [user] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (user.length < 0) {
      throw generateError("User exist ", 409);
    }
    // Encriptar la password
    const passwordEncript = await bcrypt.hash(password, 10);

    // Crearon query para el susuario nuevo
    const [newUser] = await connection.query(
      `INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)`,
      [username, email, passwordEncript]
    );

    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryNewUser };
