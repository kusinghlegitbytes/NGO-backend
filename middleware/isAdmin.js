const User=require("../model/User")
exports.isAdmin=async (req, res, next)=>{
    try{
        const userId=req.userID
        const user=await User.findById(userId)
        if(user.userType!=="admin"){
            return res.status(403).json({status:false, error:"Unauthorized", message:"Not authorized to perform this action"})
        }
        next()
    }
    catch(err){
        return res.status(500).json({status:false, message:"Internal Server Error", error:err})
    }
}