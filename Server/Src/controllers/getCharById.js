/* const axios = require("axios");
const URL = `https://rickandmortyapi.com/api/character`;

// Esta función toma dos parámetros: la respuesta HTTP y el ID del personaje que se desea obtener
const getCharById = (response, id) => {
  // Hacer una solicitud GET a la API de Rick and Morty con el ID del personaje en la URL
  axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    // Si la solicitud es exitosa, extraer la información relevante del objeto de respuesta
    .then((result) => result.data)
    .then(({ name, status, species, gender, origin, image }) => {
      // Crear un objeto con la información del personaje
      let character = {
        id,
        name,
        status,
        species,
        gender,
        origin,
        image,
      };
      // Enviar una respuesta HTTP al cliente con el objeto character en formato JSON
      response
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify(character));
    })
    // Si hay algún error en la solicitud, capturar el error y enviar una respuesta HTTP con un código de estado 500 y un mensaje de error
    .catch((error) =>
      response
        .writeHead(500, { "Content-Type": "text/plain" })
        .end(error.message)
    );
};

// Exportar la función getCharById para que pueda ser utilizada en otros archivos
module.exports = getCharById;
 */

//EXPRESS O PROMESAS

/*const axios = require('axios');
const URL = 'https://rickandmortyapi.com/api/character/';

// Esta función toma el ID de un personaje y devuelve la información del mismo
const getCharById = (req, res) => {
  const { id } = req.params;

  // Realizar una solicitud GET a la API de Rick and Morty con el ID del personaje en la URL
  axios.get(`${URL}${id}`)
    .then((response) => {
      const { name, status, species, gender, origin, image } = response.data;

      // Crear un objeto con la información del personaje
      const character = { id, name, status, species, gender, origin, image };

      // Verificar si se encontró un personaje con ese ID y enviar la respuesta correspondiente
      return character.name
        ? res.status(200).json(character)
        : res.status(404).send('Not Found');
    })
    .catch((error) => {
      // En caso de error, enviar una respuesta con el código de estado 500 y el mensaje de error
      return res.status(500).send(error.message);
    });
};*/

// CON ASYNC AWAIT

const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios(`${URL}${id}`);
    const { name, status, species, gender, origin, image } = response.data;

    const character = { id, name, status, species, gender, origin, image };

    return character.name
      ? res.status(200).json(character)
      : res.status(404).send("Not Found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// Exportar la función getCharById para que pueda ser utilizada en otros archivos
module.exports = { getCharById };
