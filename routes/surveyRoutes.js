const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    //if a user is logged in -> requireLogin (1)
    //if a user has enough credits -> reqireCredits (2) 
    //it has to be in the order as you want it to be executed
    
    //create survey
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim()})),
      //divide string and make it objects by map
      //yes, no : have default value so no need to care now
      _user: req.user.id,
      dateSent: Date.now()  
    });
    //Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

  });
};