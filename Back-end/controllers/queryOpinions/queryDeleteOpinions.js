const { getConnection } = require("../../db/db");
const { generateError } = require("../../generateError");

const queryDeleteOpinion = async (id) => {
  let connection;
  try {
    // Crearon query para la opinion nueva
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [user] = await connection.query(`DELETE FROM opinions WHERE id = ?`, [
      id,
    ]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryDeleteOpinion };
