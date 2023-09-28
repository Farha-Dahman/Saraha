export const profile = async (req,res)=>{
    return res.json({message:req.user});
}