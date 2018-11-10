const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js')

const User = mongoose.model('users'); //using userSchema loaded from User.js
//set cookie
passport.serializeUser((user, done) => {
	done(null, user.id); //done: callback
	// user.id-> not google id, but id generated by mongodb automatically(_id.$oid)
});

passport.deserializeUser((id, done) => {
	User.findById(id) //async action returns promise, findById is query of mongo
		.then(user => {
			done(null, user);
		})
});


//console.developers.google.com
passport.use(
    new GoogleStrategy(
      {
				clientID: keys.googleClientID,
				clientSecret: keys.googleClientSecret,
				callbackURL: '/auth/google/callback',
				proxy: true //trust and put https://
			}, 
			//saving data to mongodb-async action
      async (accessToken, refreshToken, profile, done) => {
				const existingUser = await User.findOne({ googleId: profile.id });
				
				if (existingUser)	{
					//we already have a record with the given ID
					return done(null, existingUser);
				} 
				//if it's null
				//we don't have a user record with this ID, make a new record
				const user = await new User({ googleId: profile.id }).save(); //save new user to db
					done(null, user);
			}
    )
);

	
	

  