const passport = require ('passport');

module.exports = (app) => {
	//when user comes to route, kick them into oauth flow. use strategy called google
	//scope tells us what access we want from google (we want profile and email)
	app.get('/auth/google', passport.authenticate('google',{
		scope: ['profile', 'email']
		})
	);

	//when user visits google auth callback, this time the user has the code already
	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	})
};