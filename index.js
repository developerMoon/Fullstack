const express = require('express'); //require: access to express library
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User'); //not executed automatically unless require it here
require('./services/passport'); //cuz passport.js is not exporting anything
//order is important as user needs to be imported first then used in passport

mongoose.connect(keys.mongoURI);

const app = express(); //generates new express app, could be single app or more
//this generated app listens incoming request

app.use(bodyParser.json());

app.use( //app.use -> wiring up middleware
    cookieSession({
        maxAge: 30*24*60*60*1000, //30 days in millisecs
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);//,'./routes/billingRoutes')(app);
require('./routes/billingRoutes')(app); 

//for routing in production
//NODE_ENV: automatically set by heroku
if (process.env.NODE_ENV === 'production') {
    //Express will serve up production assets
    //like out main.js file, or main.css file
    //if server doesnt find needed component, find it under client/build
    app.use(express.static('client/build'));

    //Exress will serve up the index.html file
    //if it doesn't recognize the route
    //when all 3 attempts above doesnt work; finding other routes and client/build 
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

//both export functions
//this PORT const shouldn't changed 
const PORT = process.env.PORT || 5000;
//Heroku inject environment variables
//only works in production mode, not local
//if there is env var defiend by heroku, use that
//otherwise use port 5000

app.listen(PORT); 
//localhost:5000 if it is in local
//express is just letting node watch port 5000
