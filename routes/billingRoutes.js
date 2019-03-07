const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin,  async (req, res) => {
    //check if user logged in, only when user try to add credits
    //console.log(req.body); //want able to check console.log via cmd
    const charge = await stripe.charges.create({
      amount: 500, //500cents
      currency : 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    //cconsole.log(charge);
    req.user.credits += 5; //this and the user below is the same
    const user = await req.user.save(); //save amount and refresh user
    
    res.send(user);
  });
};