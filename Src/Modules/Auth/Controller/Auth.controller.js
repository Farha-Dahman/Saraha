import userModel from "../../../../DB/Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SendEmail from "../../../Services/SendEmail.js";

export const signup = async (req, res) => {
  const { userName, email, password, gender } = req.body;
  const user = await userModel.findOne({ email });
  const token = jwt.sign({ email }, process.env.EMAIL_TOKEN, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ email }, process.env.EMAIL_TOKEN, {
    expiresIn: 60 * 60 * 24,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const refreshLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`;
  const html = `Click here to confirm your email <a href='${link}'>verify email</a> <br/> or <a href='${refreshLink}'>Click</a> to request a new email to verifying`;
  if (user) {
    return res.status(409).json({ message: "email already exist" });
  }
  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  const createUser = await userModel.create({
    userName,
    email,
    password: hashedPassword,
    gender,
  });
  SendEmail(email, "Confirm Email", html);
  return res.status(201).json({ message: "success", user: createUser._id });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "invalid data" });
  }
  if (!user.confirmEmail) {
    return res.status(404).json({ message: "Plz confirm your email" });
  }
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(404).json({ message: "invalid data" });
  }
  const token = jwt.sign({ id: user._id }, process.env.LOGIN_SIGNATURE);
  return res.status(200).json({ message: "success", token });
};

export const confirmEmail = async (req, res, next) => {
    const { token } = req.params;   
    try {
      const decode = jwt.verify(token, process.env.EMAIL_TOKEN);
      const user = await userModel.findOneAndUpdate(
        { email: decode.email, confirmEmail: false },
        { confirmEmail: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Your Email already is verified!" });
      } else {
        return res.redirect("https://twitter.com/i/flow/login");
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid token", error: err.message });
    }
  };
  

export const newConfirmEmail = async (req, res, next) => {
  const { refreshToken } = req.params;
  const decode = jwt.verify(refreshToken, process.env.EMAIL_TOKEN);
  const token = jwt.sign({ email: decode.email }, process.env.EMAIL_TOKEN, {
    expiresIn: "1h",
  });
  const link = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${token}`;
  const html = `Click here to confirm your email <a href='${link}'>verify email</a>`;
  SendEmail(decode.email, "Confirm Email", html);
  const user = await userModel.findOneAndUpdate(
    { email: decode.email, confirmEmail: false },
    { confirmEmail: true }
  );
  if (!user) {
    return res.status(404).json({ message: "Your Email already is verified!" });
  } else {
    return res.redirect("https://twitter.com/i/flow/login");
  }
};
