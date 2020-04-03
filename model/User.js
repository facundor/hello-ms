const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type:String,
    required: true
  },
  surname: {
    type:String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('User', UserSchema);