const bcrypt = require("bcrypt");
const { generateError } = require("../../generateError");
const { queryNewUser } = require("../../db/createUser");
const { validarEmail } = require("../../ValidacionJOI");

const newUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      throw generateError("Introduce email or password", 404);
    }

    // JOI para validar email y password
    const esValido = await validarEmail(email);
    if (!esValido) {
      throw generateError("invalid email format", 404);
    }

    const newUser = await queryNewUser(username, email, password);

    res.send({
      status: "ok",
      message: `User created with id: ${newUser}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserController,
};
