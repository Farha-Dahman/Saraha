import express from "express";
const app = express();
import * as MessageController from "./Controller/Messages.controller.js";
import { asyncHandler } from "../../Middleware/errorHandling.js";
import { auth } from "../../Middleware/Auth.middleware.js";

app.get("/", auth, asyncHandler(MessageController.getMessages));
app.post("/:receivedId", asyncHandler(MessageController.sendMessages));

export default app;
