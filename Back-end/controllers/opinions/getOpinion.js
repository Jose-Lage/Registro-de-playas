const { generateError } = require("../../generateError");
const { queryViewOpinion } = require("../queryOpinions/queryviewOpions");

const getOpinionController = async (req, res, next) => {
  try {
    const allOpinions = await queryViewOpinion();
    res.send({
      status: "ok",
      message: allOpinions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOpinionController,
};
