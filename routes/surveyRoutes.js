const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/surveys', requireLogin, (req, res) => {
    //if a user is logged in -> requireLogin

    //if a user has enough credits
  });
};