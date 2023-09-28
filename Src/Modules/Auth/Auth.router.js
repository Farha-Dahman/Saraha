import express from "express";
import * as AuthController from "./Controller/Auth.controller.js";
import { asyncHandler } from "../../Middleware/errorHandling.js";
import { validation } from "../../Middleware/validation.js";
import { loginSchema, signupSchema } from "./Auth.validation.js";
const app = express();

app.post("/signup", validation(signupSchema), asyncHandler(AuthController.signup));
app.post("/login", validation(loginSchema), asyncHandler(AuthController.login));
app.get("/confirmEmail/:token", asyncHandler(AuthController.confirmEmail));
app.get("/newConfirmEmail/:refreshToken", asyncHandler(AuthController.newConfirmEmail));

export default app;
