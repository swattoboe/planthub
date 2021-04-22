const User = require('../models/userModels');
const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  console.log(res.locals.user);
  res.cookie('ssid', res.locals.user.id, {httpOnly: true});
  return next();
};

module.exports = cookieController;