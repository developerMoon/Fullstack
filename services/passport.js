const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js')

const User = mongoose.model('users'); //using userSchema loaded from User.js

//console.developers.google.com
passport.use(
    new GoogleStrategy(
      {
				clientID: keys.googleClientID,
				clientSecret: keys.googleClientSecret,
				callbackURL: '/auth/google/callback'
			}, 
			//saving data to mongodb-async action
      (accessToken, refreshToken, profile, done) => {
				User.findOne({ googleId: profile.id })
					.then((existingUser) => {
						if (existingUser)	{
							//we already have a record with the given ID
							done(null, existingUser);
						} else { //if it's null
							//we don't have a user record with this ID, make a new record
							new User({ googleId: profile.id })
								.save() //save new user to db
								.then(user => done(null, user));
						}
					});
      }
    )
);

	
	

  