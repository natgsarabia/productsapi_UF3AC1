// const sql = require("../db/mysql-connection");
const mongoClient = require("../db/mongodb-connection");

// constructor de Product (no ES6)
const Product = function (product) {
  this.id = product.id;
  this.name = product.name;
  this.price = product.price;
};

// métodos de producto
Product.create = async (newProduct) => {
  try{
      const db = await mongoClient.connect();
      console.log('Connected successfully to database (MongoDB)');
      const collection = db.collection('products');
      if(!collection)
      {
        console.log('Error connecting to table products');
        return null;
      }

      console.log('Connected successfully to table products');
      console.log("New product to insert:", newProduct);

      const insertResult = await collection.insertOne(newProduct);
      if(insertResult)
      {
        console.log('User created successfully');
      }
      else
      {
        console.log('Error creating user');
      }

    return insertResult;

  }catch (error) {
    console.error('Error al conectar a la base de datos o insertar el producto:', error);
    throw error; 
  }
};

Product.listByID = async (id) =>{
  const db = await mongoClient.connect();
  console.log('Connected successfully to database (MongoDB)');

  const collection = db.collection('products');
  let query = {"id": parseInt(id)};
  const findResult = await collection.find(query).toArray();
  return findResult;
}

Product.listAll = async () =>{
  const db = await mongoClient.connect();
  console.log('Connected successfully to database (MongoDB)');

  const collection = db.collection('products');
  const findResult = await collection.find({}).toArray();
  return findResult;
}

Product.update = async (product) => {
  try {
    const db = await mongoClient.connect();
    console.log('Connected successfully to database (MongoDB)');

    const collection = db.collection('products');

    //
    const productId = parseInt(product.id);
    if (isNaN(productId)) {
      throw new Error(`ID inválido: ${product.id}`);
    }
    //

    const selector = {"id": parseInt(product.id)};
    const set  = { "$set": {"name": product.name, "price": product.price}};
    const updateResult = await collection.updateOne(selector,set);
    // return updateResult;
     // Verificar si realmente se modificó algún documento
     if (updateResult.matchedCount === 0) {
      console.log(`❌ No se encontró un producto con ID ${productId}`);
      return { message: "Producto no encontrado", success: false };
    } else {
      console.log(`✅ Producto actualizado correctamente: ${JSON.stringify(updateResult)}`);
      return { message: "Producto actualizado", success: true };
    }

  }catch(error) {
    console.error('❌ Error al actualizar el producto:', error);
    throw error;
  }
};

//TBD: Product.delete

module.exports = Product;

