const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  isMarried: { type: Boolean, required: true},
  skill: [{
    experience: { type:Number, required: true },
    name: { type: String, required: true },
   
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
