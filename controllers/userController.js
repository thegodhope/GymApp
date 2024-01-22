const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userSchema = require("../middlewares/userValidation");
const { successResponse, errorResponse } = require("../utils/response");

// Create a new user and save it to the database
exports.createUser = async (req, res) => {
  const {
    gender,
    age,
    height,
    weight,
    goals,
    activityLength,
    email,
    password,
  } = req.body;

  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      //res.status(400).json({ errors });
      return errorResponse(res, 400, errors);
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return errorResponse(res, 409, "email already in use");
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      gender,
      age,
      height,
      weight,
      goals,
      activityLength,
      email,
      password: hashedPassword, // Save the hashed password
    });

    await newUser.save();

    return successResponse(
      res,
      { userId: newUser._id, email: newUser.email },
      201,
      "Sign up successful"
    );
  } catch (error) {
    return errorResponse(res, 500, "User registration failed");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is  registered
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return errorResponse(res, 401, "invalid email or password");
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return errorResponse(res, 401, "invalid email or password");
    }

    //Generate JWT token for authentication
    const payloads = { userId: existingUser.id, email: existingUser.email };
    const accessToken = jwt.sign(payloads, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // return res.status(201).json({ userId: newUser._id, email: newUser.email, });
    return successResponse(res, payloads, 200, "login successful", accessToken);
  } catch (error) {
    return errorResponse(res, 500, "an error occured");
  }
};
