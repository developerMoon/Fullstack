const mongoose = require('mongoose');
//const Schema = mongoose.Schema; same as below const{ Schema }
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String ,
    credits: { type: Number, default: 0  } //assign object and specify options
});

mongoose.model('users', userSchema);
