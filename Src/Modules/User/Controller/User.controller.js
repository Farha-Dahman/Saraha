import userModel from "../../../../DB/Models/User.model.js";
import Cloudinary from "../../../Services/Cloudinary.js";
import bcrypt from "bcryptjs";

export const profile = async (req, res, next) => {
  // const imageUrl = req.file.destination + "/" + req.file.filename;
  if (!req.file) {
    return next(new Error("Please provide a file!"));
  }
  const { public_id, secure_url } = await Cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.APP_NAME}/user/${req.user._id}/profile`,
    }
  );
  const user = await userModel.findByIdAndUpdate(req.user._id, {
    profilePicture: { public_id, secure_url },
  });
  if (user.profilePicture.public_id) {
    await Cloudinary.uploader.destroy(user.profilePicture.public_id);
  }
  return res.json({ message: user });
};

export const coverPicture = async (req, res) => {
  const coverPicture = [];
  for (const file of req.files) {
    const { secure_url } = await Cloudinary.uploader.upload(file.path, {
      folder: `${process.env.APP_NAME}/user/${req.user._id}/cover`,
    });
    coverPicture.push(`${secure_url}/${file.filename}`);
  }
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { cover: coverPicture },
    { new: true }
  );
  return res.json({ message: "success", user });
};

export const addFile = async (req, res) => {
  const { secure_url } = await Cloudinary.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/user/${req.user._id}/file`,
  });
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { file: secure_url },
    { new: true }
  );
  return res.json({ message: user });
};

export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const user = await userModel.findById(req.user._id);
  const match = bcrypt.compareSync(oldPassword,user.password);
  if(!match){
    return res.json({message: "invalid old password"});
  }
  const hashPassword = bcrypt.hashSync(newPassword,parseInt(process.env.SALT_ROUND));
  await userModel.updateOne({password:hashPassword});
  return res.json(user);
};

export const sharedProfile = async(req, res, next) =>{
  const user = await userModel.findById(req.params.id).select('userName email');
  if(!user){
    return res.json({message: "user not found!"});
  }
  return res.json({message: "success", user})
}