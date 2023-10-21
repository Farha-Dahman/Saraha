import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    profilePicture: {
      type: Object,
    },
    cover: {
      type: [String],
    },
    file: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
