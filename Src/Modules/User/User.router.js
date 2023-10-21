import express from "express";
import * as userController from "./Controller/User.controller.js";
import { auth } from "../../Middleware/Auth.middleware.js";
import { asyncHandler } from "../../Middleware/errorHandling.js";
import fileUpload, { fileValidation } from "../../Services/CloudMulter.js";
import * as validators from "./User.validation.js";
import { validation } from "../../Middleware/validation.js";
const app = express();

app.get(
  "/",
  fileUpload(fileValidation.image).single("image"),
  auth,
  validation(validators.profileVal),
  asyncHandler(userController.profile)
);
app.patch(
  "/cover",
  fileUpload(fileValidation.image).array("images", 5),
  auth,
  asyncHandler(userController.coverPicture)
);
app.patch(
  "/file",
  fileUpload(fileValidation.file).single("file"),
  auth,
  asyncHandler(userController.addFile)
);
app.patch(
  "/updatePassword",
  auth,
  validation(validators.updatePassword),
  asyncHandler(userController.updatePassword)
);
app.get(
  "/:id/profile",
  validation(validators.sharedProfile),
  asyncHandler(userController.sharedProfile)
);
export default app;
