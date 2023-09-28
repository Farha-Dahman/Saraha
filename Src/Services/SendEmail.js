import nodemailer from "nodemailer";

const SendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SEND_EMAIL,
      pass: process.env.SEND_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Saraha 👻" <${process.env.SEND_EMAIL}>`,
    to,
    subject,
    html,
  });
};
export default SendEmail;
