const { generateError } = require("../../generateError");
const { queryNewOpinion } = require("../queryOpinions/QuerynewOpinion");

const newOpinionController = async (req, res, next) => {
  try {
    const { titulo, texto } = req.body;
    const { id } = req.auth.id;

    // Añadir npm JOI para validar email y password
    if (!texto || !titulo) {
      throw generateError("Insert a valid opinion", 404);
    }

    const newOpinionText = await queryNewOpinion(id, titulo, texto);

    res.send({
      status: "ok",
      message: `your opinion was succesfully posted: ${newOpinionText}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newOpinionController,
};
