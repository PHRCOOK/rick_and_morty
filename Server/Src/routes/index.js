const router = require("express").Router();
const { getCharById } = require("../controllers/getCharById");
const login = require("../controllers/login");
const register = require("../controllers/register");
const postFav = require("../controllers/postFav");
const deleteFav = require("../controllers/deleteFav");
const postUser = require("../controllers/postUser");
const postReg = require("../controllers/postReg");

// Ruta para obtener información de un personaje por su ID
router.get("/character/:id", getCharById);

// Ruta para el inicio de sesión
router.get("/login", login);

router.post("/login", postUser);

router.get("/register", register);

router.post("/register", postReg);

// Ruta para agregar un favorito
router.post("/fav", postFav);

// Ruta para eliminar un favorito por su ID
router.delete("/fav/:id", deleteFav);

module.exports = router;
