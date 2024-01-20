const mongoose = require("mongoose");
require("dotenv").config();

// write a function that connects to database
const mongoURI = process.env.MONGODB_URI;
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DATABASE sucessfully");
  } catch (error) {
    console.error("Error connecting to DATABASE:", error);
  }
}

connectToDatabase();