const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    //if a user is logged in -> requireLogin (1)
    //if a user has enough credits -> reqireCredits (2) 
    //it has to be in the order as you want it to be executed
  });
};