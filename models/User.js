// const sql = require("../db/mysql-connection");
const mongoClient = require("../db/mongodb-connection");

// constructor de Product (no ES6)
const User = function (user) {
  //   this.id = user.id;
  this.name = user.name;
  this.password = user.password;
  this.apiKey = user.apiKey;
};

// métodos de User
User.create = async (newUser) => {
  try{
     const db= await mongoClient.connect();
    console.log('Connected successfully to database (MongoDB)');


    const collection = db.collection('users');

    if(!collection)
    {
      console.log('Error connecting to table users');
      return null;
    }
 
      
    console.log('Connected successfully to table users');
    console.log("New User to insert:", newUser);

    //FUNCION ASYNC
    const insertResult =await collection.insertOne(newUser);
    if(insertResult)
    {
      console.log('User created successfully');
    }
    else
    {
      console.log('Error creating user');
    }
    return insertResult;

  } catch (error) {
    console.error('Error al conectar a la base de datos o insertar el usuario:', error);
    throw error; 
  }
};

User.authenticateKey = async (apikey) => {
  const db= await mongoClient.connect();
  console.log('Connected successfully to database (MongoDB)');

  const collection = db.collection('users');
  const query = { "apiKey": apikey };
  const apiKeyExists = await collection.count(query);
  return apiKeyExists;
}

// User.authenticateKey = (apiKey) => {
//   let apiKeyExists = null;
//   let p = new Promise((res, rej) => {
//     sql.query(`SELECT COUNT(id) FROM users where apiKey='${apiKey}'`,
//       (err, results, fields) => {
//         apiKeyExists = results[0]["COUNT(id)"]
//         // console.log("apiKey exists is database: ",apiKeyExists)
//         res(apiKeyExists)
//       })
//   })
//   return p
// }

module.exports = User;

