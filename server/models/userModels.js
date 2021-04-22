const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://Swattoboe:mynewpassword@cluster0.9lr8b.mongodb.net/planthub?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'planthub'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const newUser = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  location: {type: String, required: true},
  plants: Array
});

const User = mongoose.model('user', newUser);

// module.exports = {
//   User
// };
module.exports = User;