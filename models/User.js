const mongoose = require('mongoose');
//const Schema = mongoose.Schema; same as below const{ Schema }
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String 
});

mongoose.model('users', userSchema);
