import express from "express";
import * as userRouter from "./Controller/User.controller.js";
import { auth } from "../../Middleware/Auth.middleware.js";
import { asyncHandler } from "../../Middleware/errorHandling.js";
const app = express();

app.get('/',auth, asyncHandler(userRouter.profile));

export default app;