//const http = require("http");
//const PORT = 3001;
//const getCharById = require("./controllers/getCharById");

// Crear el servidor HTTP
//http
//.createServer((req, res) => {
//res.setHeader("Access-Control-Allow-Origin", "*");
//const { url } = req;

// Verificar si la URL incluye "/rickandmorty/character"
//if (url.includes("/rickandmorty/character")) {
// Extraer el ID del personaje de la URL
//const id = Number(url.split("/").pop());

// Llamar a la función getCharById para obtener los detalles del personaje
//getCharById(res, Number(id));
//}
//})
//.listen(PORT, "localhost");

/*const express = require("express");
const server = express();*/

/*const router = require("./routes/index");
const axios = require("axios");

// Configuración de los encabezados CORS para permitir solicitudes desde cualquier origen
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Configuración del middleware para analizar el cuerpo de las solicitudes como JSON
server.use(express.json());

// Configuración de las rutas del servidor utilizando el enrutador definido en "./routes/index"
server.use("/rickandmorty", router);*/

// Iniciar el servidor y escuchar en el puerto especificado
const server = require("./App");
const { conn } = require("./DB_connection");

const PORT = 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("Servidor levantado en el puerto: " + PORT);
  });
});
