const { generateError } = require("../../generateError");
const { queryUpdateUser } = require("../../db/updateuser");
const { validarEmail } = require("../../ValidacionJOI");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const updateUserController = async (req, res, next) => {
  try {
    const { nuevoUsuario, nuevoCorreo, nuevaContraseña } = req.body;
    const { id } = req.auth.id;

    if (!nuevoCorreo || !nuevaContraseña) {
      throw generateError("Email or password invalid", 404);
    }

    const esValido = await validarEmail(nuevoCorreo);
    if (!esValido) {
      throw generateError("invalid email format", 404);
    }

    const informacionActualizada = await queryUpdateUser(
      nuevoUsuario,
      nuevoCorreo,
      nuevaContraseña,
      id
    );
    res.send({
      status: "ok",
      respuestaNuevoUsuario: informacionActualizada,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserController,
};
