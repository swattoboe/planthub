const express = require('express');
const app = express();
const path = require('path');

const userController = require('./controllers/userController.js');


app.use('/build', express.static(path.join(__dirname, '../build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/', userController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});

app.post('/login', userController.verifyUser, (req, res) => {
  // console.log('attempting to redirect');
  // res.sendFile(path.join(__dirname, '../index.html'));
  res.status(200).send(res.locals.user);
} );

app.get('/main', userController.getAllUsers,  (req, res) => {
  // console.log(res.locals.user)
  return res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/profile', (req, res) => {
  return res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/profile/user', userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

app.get('/signup', (req, res) => {
});

app.post('/signup', userController.createUser,  (req, res) => {
  return res.status(200).json(res.locals.user);
});

app.delete('/delete', userController.deleteUser, (req, res) => {
});

// app.use(function (err, req, res) {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred' }, 
//   };
//   const errObj = Object.assign(defaultErr, err);
//   res.status(errObj.status).json(errObj.message);
// });

app.listen(3000, () => {
  console.log('listening on 3000');
});