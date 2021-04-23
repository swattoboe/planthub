const User = require('../models/userModels');
const userController = {};

userController.getAllUsers = async (req, res, next) => {
  try{
    const users = await User.find({});
    res.locals.users = users;
    return next();
  }
  catch(e){
    return next(`Error in userController.getAllUsers: ${JSON.stringify(e)}`);
  }
};


userController.createUser = async (req, res, next) => {
  console.log(req.body);
  // if (err) res.status(400).next()
  const {
    username,
    password,
    name,
    email,
    location
  } = req.body;

  try {
    const newUser = await User.create({
      username: username,
      password: password,
      name: name,
      email: email,
      location: location
    });
    res.locals.user = newUser;
    return next();
  } catch(e){
    return next(`Error in userController.createUser: ${JSON.stringify(e)}`);
  }
};
// userController.updateUser = (req, res, next) => {
//   const { name } = req.params;

//   models.User.updateOne({name: name}, {}, (err, user) => {
//     if (err) {
//       throw err;
//     }
//     res.status(200).send(JSON.stringify(user));
//     return next();
//   });
// };

userController.deleteUser = async (req, res, next) => {
  console.log(req.body);
  const { name } = req.body;
  try {
    const deletedUser = await User.deleteOne({name: name});
    return next();
  }
  catch(e){
    return next(`Error in userController.deleteUser: ${JSON.stringify(e)}`);
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return next('Missing usernmae or password in userController.verifyUser');
  try {
    const user = await User.findOne({username: username, password: password});
    res.locals.user = user;
    return next();
  } 
  catch(e) {
    return next(`Error in userController.verifyUser: ${JSON.stringify(e)}`);
  }
};

userController.getUser = async (req, res, next) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({username: username});
    res.locals.user = user;
    return next();
  }
  catch(e) {
    return next(`Error in userController.addPlants: ${JSON.stringify(e)}`);
  }
};

userController.addPlants = async (req, res, next) => {
  // console.log("req body in addPlants", req.body)
  const { username, plantname, species, price } = req.body;
  try {
    const plants = await User.updateOne({username: username}, {$push: {plants: [{
      name: plantname,
      species: species,
      price: price
    }]}});
    res.locals.username = username
    console.log('username', username)
    return next();
  }
  catch(e) {
    return next(`Error in userController.addPlants: ${JSON.stringify(e)}`);
  }
};

userController.deletePlant = async (req, res, next) => {
  console.log("req body in deletePlants", req.body)
  const { username, _id } = req.body;
  try {
    const deleted = await User.updateOne({username: username}, {$pull: {plants: {_id: _id}}});
    res.locals.username = username;
    console.log('res.locals.username', username);
    return next();
  }
  catch(e) {
    return next(`Error in userController.deletePlant: ${JSON.stringify(e)}`);
  }
};

module.exports = userController;