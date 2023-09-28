import joi from "joi";

export const signupSchema = {
  body: joi.object({
    userName: joi.string().alphanum().required(),
    email: joi.string().email().required().messages({
      "string.empty": "email is required",
      "string.email": "plz enter a valid email",
      "any.required": "plz enter all required felid",
    }),
    password: joi.string().min(3).required(),
    cPassword: joi.string().valid(joi.ref("password")).required().messages({
      "any.only": "confirm password is not same as password",
      "any.required":"confirm password is required",
    }),
    gender: joi.string().valid("Male", "Female").messages({
      "any.only": "gender must be one of [ Male , Female ]",
    }),
  }),
};

export const loginSchema = {
  body: joi.object({
    email: joi.string().email().required().min(5).messages({
      "string.empty": "email is required",
      "string.email": "plz enter a valid email",
      "string.min": "email length must be at least 5 characters",
    }),
    password: joi.string().required().messages({
      "string.empty": "password is required",
    }),
  }),
};
