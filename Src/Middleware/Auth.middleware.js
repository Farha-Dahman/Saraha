import jwt from "jsonwebtoken";
import userModel from "../../DB/Models/User.model.js";
import { asyncHandler } from "./errorHandling.js";

export const auth = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization?.startsWith(process.env.BEARER_KEY)) {
    return res.json({ message: "invalid authorization" });
  }
  const token = authorization.split(process.env.BEARER_KEY)[1];
  if (!token) {
    return res.json({ message: "invalid authorization" });
  }
  const decoded = jwt.verify(token, process.env.LOGIN_SIGNATURE);

  const authUser = await userModel
    .findById(decoded.id)
    .select("userName email");
  if (!authUser) {
    return res.json({ message: "not register user" });
  }
  req.user = authUser;
  next();
});
