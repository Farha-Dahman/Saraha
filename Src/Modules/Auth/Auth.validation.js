import joi from "joi";
import { generalFelids } from "../../Middleware/validation.js";

export const signupSchema = {
  body: joi.object({
    userName: joi.string().alphanum().required(),
    email: generalFelids.email,
    password: generalFelids.password,
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
    email: generalFelids.email,
    password: generalFelids.password,
  }),
};
