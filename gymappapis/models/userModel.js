 const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  age: {
    type: Number,
    min: 18,
  },
  height: {
    type: Number,
    min: 0, // assuming height is in centimeters
  },
  weight: {
    type: Number,
    min: 0, // assuming weight is in kilograms
  },
  goals: {
    type: String,
  },
  activityLength: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
   
},{timestamps : true});

const User = mongoose.model("User", userSchema);

module.exports = User;
