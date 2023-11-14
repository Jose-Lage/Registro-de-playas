const { generateError } = require("../../generateError");
const { queryDeleteOpinion } = require("../queryOpinions/queryDeleteOpinions");

const deleteOpinionController = async (req, res, next) => {
  try {
    const idOpinon = req.headers.idopinion;

    await queryDeleteOpinion(idOpinon);

    res.send({
      status: "ok",
      message: `Opinion borrada con exito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteOpinionController,
};
