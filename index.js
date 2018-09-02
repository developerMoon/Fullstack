const express = require('express'); //require: access to express library
const app = express(); //generates new express app, could be single app or more
//this generated app listens incoming request

app.get('/', (req, res)=>{
    res.send({ hi: 'there' }); //route handler
    //want to close the req and send back response containing the json data
    //arrow function automatically called, any time some request comes into '/'
}); //express server running

//this PORT const shouldn't changed 
const PORT = process.env.PORT || 5000;
//Heroku inject environment variables
//only works in production mode, not local
//if there is env var defiend by heroku, use that
//otherwise use port 5000

app.listen(PORT); 
//localhost:5000 if it is in local
//express is just letting node watch port 5000
