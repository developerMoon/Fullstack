const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema ({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], //array
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, //relationship with User, _ : reference schema
  dateSent: Date,
  lastResponded: Date //additional feature
});

mongoose.model('surveys', surveySchema);