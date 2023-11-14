const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateError } = require("../../generateError");
const { queryLogin } = require("../../db/userLogin");
const { validarEmail } = require("../../ValidacionJOI");

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const esValido = await validarEmail(email);
    if (!esValido) {
      throw generateError("invalid email format", 404);
    }

    const user = await queryLogin(email);
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      throw generateError("password does not match", 401);
    }

    const payload = { id: user };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.send({
      status: "ok",
      data: {
        token,
        id: user.id,
        usuario: user.user_name,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
};
