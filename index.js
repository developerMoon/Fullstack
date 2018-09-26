const express = require('express'); //require: access to express library
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./services/passport'); //cuz passport.js is not exporting anything
require('./models/User'); //not executed automatically unless require it here
mongoose.connect(keys.mongoURI);

const app = express(); //generates new express app, could be single app or more
//this generated app listens incoming request

require('./routes/authRoutes')(app);

//this PORT const shouldn't changed 
const PORT = process.env.PORT || 5000;
//Heroku inject environment variables
//only works in production mode, not local
//if there is env var defiend by heroku, use that
//otherwise use port 5000

app.listen(PORT); 
//localhost:5000 if it is in local
//express is just letting node watch port 5000