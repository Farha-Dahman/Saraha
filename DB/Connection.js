import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_LOCAL)
    .then(() => {
      console.log("connect with DB");
    })
    .catch((error) => {
      console.log(`error when connect db ${error}`);
    });
};

export default connectDB;
