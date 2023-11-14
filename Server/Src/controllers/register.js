const { User } = require("../DB_connection");

const register = async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!email || !password) {
      return res.status(400).send("Faltan datos");
    }
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      return res.status(409).send("El usuario ya existe");
    }
    await User.create({
      email: email,
      password: password,
    });
    return res.json({
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = register;
