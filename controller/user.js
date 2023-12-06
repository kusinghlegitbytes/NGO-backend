const User=require("../model/User")
const {generateToken}=require("../util/token")
const Organization=require("../model/Organization")
exports.createUser= async (req, res, next)=>{
    try{
        let user=new User(req.body)
        user=await user.save()
        user=user.toObject()
        delete user.password
        const token=generateToken({id:user._id})
        res.status(200).json({status:true, message:'User created successfully', data:{user, accessToken:token}})
    }catch(err){
        if(err.code===11000){
            return res.status(409).json({status:false, message:'Phone number and email already registered', error:"Already registered"})
        }
        res.status(500).json({status:false, message:'Internal Server Error', error:err})
    }
}
exports.loginUser=async(req, res, next)=>{
    try{
        let password=req.body.password
       let email=req.body.email
        user=await User.find({email})
        user=user[0]
        if(!user){
            return res.status(404).json({status:false, message:"Invalid email/password"})
        }
        user.comparePassword(password, function(err, isMatched){
            if(err){
                return res.status(500).json({
                    status:false,
                    message:"Internal server error",
                    error:err
                })
            }
            if(!isMatched){
                return res.status(401).json({
                    status:false,
                    message:"Invalid email/password"
                })
            }
            user=user.toObject()
            delete user.password
            const accessToken=generateToken({id:user._id})
            res.status(200).json({
                status: true,
                message: "Login successful",
                data: {user, accessToken}
            });
        })
    }catch(err){
        res.status(500).json({status:false, message:'Internal Server Error', error:err})
    }
}
exports.getUsers=async (req, res, next)=>{
    try{
        const users=await User.find().select("-password")
        const noOfRecords=users.length
        res.status(200).json({
            status:true,
            message:"Users List",
            data:users,
            noOfRecords:noOfRecords
        })
    }catch(err){
        res.status(500).json({
            status:false,
            message:"Internal server error",
            error:err
        })    
    }
}
exports.getUser= async (req, res, next)=>{
    try{
        const id=req.params.id
        let user=await User.findById(id).select("-password")
        if(!user){
            return res.status(404).json({status:false, message:"User not found", data:null})
        }
        res.status(200).json({status:true, message:'User fetched successfully', data:user})
    }catch(err){
        res.status(404).json({status:false, message:'Failed to fetch User', error:err})
    }
}
exports.updateUser=async (req, res, next)=>{
    try{
        const userID=req.userID
        const data=req.body
        const id=req.params.id
        const existingUser=await User.findById(id)
        if(!existingUser){
            return res.status(404).json({status:false, error:"User not found", message:"Failed to updated"})
        }
        const updatedUser=await User.findByIdAndUpdate(id, data, {new:true}).select("-password")
        return res.status(200).json({status:true, message:"User updated successfully", data:updatedUser})
    }catch(err){
        res.status(500).json({status:false, message:"Failed to update", error:err})
    }
}
exports.deleteUser=async (req, res, next)=>{
    try{
        const userId=req.userID
        const id=req.params.id
        const existingUser=await User.findById(id)
        if(!existingUser){
            return res.status(404).json({status:false, message:"Failed to delete", error:"User not found"})
        }
        const ngosByUser=await Organization.find({user:userId})
        if(ngosByUser.length>0){
            for (const ngo of ngosByUser) {
                console.log(ngo._id)
                await Organization.findByIdAndDelete(ngo._id);
            }
        }
        const deletedUser=await User.findByIdAndDelete(id)
        return res.status(200).json({status:true, message:"User deleted successfully", data:null})
    }catch(err){
        return res.status(500).json({status:false, message:"Failed to delete", error:err})
    }
}
exports.changeUserType=async (req, res, next)=>{
    try{
        const userId=req.params.id
        const body=req.body
        const existingUser=await User.findById(userId)
        if(!existingUser){
            return res.status(404).json({status:false, message:"Failed to change user type", error:"User not found"})
        }
        const updatedUser=await User.findByIdAndUpdate(userId, body, {new:true}).select("-password")
        return res.status(200).json({status:true, message:"User type changed successfully", data:updatedUser})
    }catch(err){
        res.status(500).json({status:false, message:"Failed to change user type", error:err})
    }
}