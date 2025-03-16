const User = require('../../models/User')
const auth = require('../../auth/auth')

const createUser = ((req, res) => {
  //Create user model
  // let today = new Date().toISOString().split('T')[0];
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    apiKey: auth.genAPIKey(),
    // usage: [{ date: today, count: 0 }],
  });

  console.log("Nombre usuario:"+user.name+" contraseña: "+user.password+" apikey: "+user.apiKey);

  
  // Save Product in the database
  User.create(user)
    .then((results) => {
      // HTTP response
      res.json(`User registered successfully. Use apikey= ${user.apiKey}`);
    })
    .catch((error)=>{
      res.json("Error when registering user");
    })
    .finally(()=>{
      //
    })
})

module.exports = createUser


