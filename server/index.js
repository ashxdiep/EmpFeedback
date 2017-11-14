const express = require ('express');
const mongoose = require ('mongoose');
const cookieSession = require('cookie-session');
const passport = require ('passport');
const keys = require ('./config/keys');

//you have to define the model user before you can use it in passport
require('./models/User');
require('./services/passport');


const app = express();
require ('./routes/authRoutes')(app);

//tell application we need cookies 
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

//tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

//if there isn't already defined variable, use 5000 as port
const PORT = process.env.PORT || 5000;

app.listen(PORT);
