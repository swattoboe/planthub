const session = require('express-session');
const User = require('../models/userModels');
const Session = require('../models/sessionModel');
const sessionController = {};

sessionController.startSession = async (req, res, next) => {
  await Session.create({cookieId: res.locals.user.id}, (err, session) => {
    if (err) return next(`Error in sessionController.startSession: ${JSON.stringify(err)}`);
    return next();
  });
};

module.exports = sessionController;