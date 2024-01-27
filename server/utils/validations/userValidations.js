import Joi from "joi";
export const validateUserSignUp = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "any.required": "Username is required",
      "string.empty": "Username cannot be empty",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Invalid email address",
      "string.empty": "Email cannot be empty",
    }),
    password: Joi.string().min(5).required().messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 5 characters",
      "string.empty": "Password cannot be empty",
    }),
    role: Joi.string()
      .valid("admin", "student", "landlord")
      .optional()
      .label("Role")
      .messages({
        "string.valid":
          "Invalid role. Choose from 'admin', 'student', or 'landlord'",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

export const validateUserSignIn = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Invalid email address",
      "string.empty": "Email cannot be empty",
    }),
    password: Joi.string().min(5).required().messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 5 characters",
      "string.empty": "Password cannot be empty",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

export const validationError = (error) => {
  const message = error.details.map((detail) => detail.message);
  return res.status(400).json({ success: false, error: message });
};
