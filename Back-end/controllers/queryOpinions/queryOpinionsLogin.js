const { getConnection } = require("../../db/db");

const queryOpinionsLogin = async (id) => {
  let connection;
  try {
    // Crearon query para la opinion nueva
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [userOpinion] = await connection.query(
      `SELECT DISTINCT opinions.id, users.user_name,
      opinions.user_id, opinions.titulo, opinions.text,
      opinions.cantidad_likes,
      DATE_FORMAT(opinions.created_at, '%Y/%m/%d') AS created_at,
      (ul.user_id is not null) AS id_usuario_like
      FROM users
      JOIN opinions ON users.id = opinions.user_id
      LEFT JOIN (SELECT * FROM opiniones.likes
      WHERE user_id = ?) ul ON opinions.id = ul.opinion_id`,
      [id]
    );

    return userOpinion;

    /*if (like.length > 0) {
        throw generateError("User exist", 409);
      }*/
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryOpinionsLogin };
