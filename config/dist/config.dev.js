"use strict";

require('dotenv').config();

var mongoURI = process.env.MONGOURI;

if (!mongoURI) {
  console.error("¡Error! La variable de entorno MONGOURI no está definida.");
  process.exit(1); // Termina el proceso si la URI no está definida
}

console.log("MongoURI:", mongoURI);
module.exports = {
  mongoURI: mongoURI
};