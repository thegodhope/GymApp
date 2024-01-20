const Joi = require("joi");

// Define Joi schema for user input validation
const userSchema = Joi.object({
  gender: Joi.string().valid("male", "female", "other").required(),
  age: Joi.number().min(18).required(),
  height: Joi.number().min(0).required(),
  weight: Joi.number().min(0).required(),
  goals: Joi.string().optional(),
  activityLength: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

module.exports = userSchema;
