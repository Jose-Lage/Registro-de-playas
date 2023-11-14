const { getConnection } = require("../../db/db");
const { generateError } = require("../../generateError");

const queryNewOpinion = async (userId, titulo, texto) => {
  let connection;
  try {
    // Crearon query para la opinion nueva
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [user] = await connection.query(
      `INSERT INTO opinions (user_id, titulo, text) VALUES (?, ?, ?)`,
      [userId, titulo, texto]
    );

    /*if (user.length > 0) {
      throw generateError("User exist ", 409);
    }*/
    return texto;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryNewOpinion };
