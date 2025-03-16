const {MongoClient} = require("mongodb");
const {mongoURI} = require("../config/config.js");

const dbName = 'Products';

// create mongoDB client
const client = new MongoClient(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log("Conectado correctamente a MongoDB Atlas");
        return client.db(dbName);
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error);
        throw error;  // Lanza el error para que sea manejado adecuadamente
    }
}

module.exports = { client, connect };