const { getConnection } = require("../../db/db");
const { generateError } = require("../../generateError");

const queryViewOpinion = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `SELECT opinions.id, users.user_name, opinions.user_id, opinions.titulo, opinions.text,opinions.cantidad_likes, 
      DATE_FORMAT(opinions.created_at, '%Y/%m/%d') AS created_at
      FROM users
      JOIN opinions ON users.id = opinions.user_id`
      //`SELECT titulo, text, created_at FROM opinions`
    );

    return user;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryViewOpinion };
