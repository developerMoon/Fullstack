const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url'); //parse URL, comes with node
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for your feedback');
  });
  
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    
    _.chain(req.body)
      .map(({ email, url  }) => {
        const match = p.test(new URL(url).pathname); //match will be object or null
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
          //match can be null so no refactor for match
        }
      })
      .compact()
      //remove duplicated events, but a single user can vote multiple different surveys
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        //sample query
        //find the survey that has the same survey id
        //find one argument and if it does, update the second
        //async function but won't put async, because not gonna check these 
        Survey.updateOne({
          //_: assigned by mongo
            _id: surveyId, 
            recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          //$inc: mongo operator, increment
          //choice: not an array but the choice, yes or no
          $inc: { [choice]: 1 },
          //update responded to true
          $set: { 'recipients.$.responded': true }
        }).exec(); //send it to the db
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
    
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user); //new value credits
    } catch (err) {
      res.status(422).send(err);
    }

  });
};