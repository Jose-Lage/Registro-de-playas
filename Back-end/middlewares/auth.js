const jwt = require("jsonwebtoken");
const { generateError } = require("../generateError");

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("falta autorizacion", 401);
    }

    // Comprobar que el token sea correcto
    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError("token no coincide, 401");
    }

    // Meter la informacion del token en la reques pra usarla en el controller

    req.auth = token;

    // pasamos al controlador

    next();
  } catch (error) {
    // Igul no funciona
    next(error);
  }
};

module.exports = { authUser };
