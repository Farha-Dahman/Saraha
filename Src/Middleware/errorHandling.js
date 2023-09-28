export const asyncHandler = (func) =>{
    return (req,res,next)=>{
        func(req,res,next).catch((error)=>{
            return res.status(500).json({message:"catch error", error:error.stack});
        })
    }
}