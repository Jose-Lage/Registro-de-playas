const { getConnection } = require("../db/db");
const { generateError } = require("../generateError");
const bcrypt = require("bcrypt");

const queryLogin = async (email) => {
  let connection;
  try {
    // Crearon query para la opinion nueva
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [user] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (user.length === 0) {
      throw generateError("User not exist ", 409);
    }
    return user[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryLogin };
