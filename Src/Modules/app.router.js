import messageRouter from "./Messages/Messages.router.js";
import authRouter from "./Auth/Auth.router.js";
import userRouter from "./User/User.router.js";
import connectDB from "../../DB/Connection.js";
import cors from "cors";
import { globalErrorHandler } from "../Middleware/errorHandling.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const initApp = (app, express) => {
  const filePath = path.join(__dirname, "../uploads");
  connectDB();
  app.use(cors());
  app.use("/uploads", express.static(filePath));
  app.use(express.json());
  app.use("/messages", messageRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("*", (req, res) => {
    return res.json({ message: "page not found" });
  });
  app.use(globalErrorHandler);
};
export default initApp;
