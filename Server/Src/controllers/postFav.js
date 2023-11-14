const { Favorite } = require("../DB_connection");

const postFav = async (req, res) => {
  try {
    const { id, name, status, origin, gender, image, species } = req.body;
    if (!id || !name || !status || !origin || !gender || !image || !species) {
      return res.status(401).send("Faltan Datos");
    }
    await Favorite.findOrCreate({
      where: { id, name, status, origin, gender, image, species },
    });

    const allFavorites = await Favorite.findAll();
    return res.json(allFavorites);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = postFav;
