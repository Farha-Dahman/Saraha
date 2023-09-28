import MessageModel from "../../../../DB/Models/Message.model.js";
import userModel from "../../../../DB/Models/User.model.js";

export const getMessages = async (req,res)=>{
    const messages = await MessageModel.find({receivedId:req.user._id});
    return res.json({message:"success", messages});
}

export const sendMessages = async (req,res)=>{
    const {receivedId} = req.params;
    const {message} = req.body;
    const user = await userModel.findById(receivedId);
    if(!user){
        return res.status(404).json({message:"user not found!"});
    }
    const createMessage = await MessageModel.create({message,receivedId});
    return res.status(201).json({message:createMessage});
}