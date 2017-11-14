const passport = require('passport');
const mongoose = require ('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		})
});

console.log(keys.googleClientID);
console.log(keys.googleClientSecret);

//create new instance of google strategy and use passport to be aware of it
//if passport uses string of google, passport will use this
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
	}, 
	(accessToken, refreshToken, profile, done) => {
		//check to see if they already have an account
		//the query returns a promise ( asynch)
		User.findOne({
			googleId: profile.id
		}).then((existingUser) => {
			if (existingUser){
				//there is already an account 
				done(null, existingUser);
			}else {
				//creates a new instance of a user
				//.save will save the model instance into the database 
				new User ({ googleId: profile.id }).save()
					.then(user => done(null, user));
			}
		});
		
	})
);