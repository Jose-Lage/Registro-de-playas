const { getConnection } = require("../../db/db");
const { generateError } = require("../../generateError");

const queryPosLike = async (eventoId, id) => {
  console.log("idopinion query", eventoId);
  let connection;
  try {
    // Crearon query para la opinion nueva
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [like] = await connection.query(
      `UPDATE opinions SET cantidad_likes = cantidad_likes + 1 WHERE id = ?`,
      [eventoId]
    );

    const [casa] = await connection.query(
      `INSERT INTO likes (user_id, opinion_id)
      VALUES (?, ?)`,
      [id, eventoId]
    );

    console.log("respuesta query", like);
    console.log("id user controlador", casa);

    /*if (like.length > 0) {
      throw generateError("User exist", 409);
    }*/
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryPosLike };
