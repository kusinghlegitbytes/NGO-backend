const User=require("../model/User")
const {generateToken}=require("../util/token")
exports.createUser= async (req, res, next)=>{
    try{
        let existingUser=await User.find({email:req.body.email})
        existingUser=existingUser[0]
        if(existingUser){
            return res.status(400).json({success:false, message:"User already exist"})
        }
        let user=new User(req.body)
        user=await user.save()
        user=user.toObject()
        delete user.password
        const token=generateToken({id:user._id})
        res.status(200).json({success:true, message:'User created successfully', data:{user, accessToken:token}})
    }catch(err){
        console.log(err)
        res.status(424).json({success:false, message:'Failed to create User', error:err})
    }
}
exports.loginUser=async(req, res, next)=>{
    try{
        console.log("====================== called")
        let password=req.body.password
       let email=req.body.email
        user=await User.find({email})
        user=user[0]
        if(!user){
            return res.status(404).json({success:false, message:"Invalid email/password"})
        }
        user.comparePassword(password, function(err, isMatched){
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Internal server error",
                    error:err
                })
            }
            if(!isMatched){
                return res.status(401).json({
                    success:false,
                    message:"Invalid email/password"
                })
            }
            user=user.toObject()
            delete user.password
            const token=generateToken({id:user._id})
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: {user, token}
            });
        })
    }catch(err){
        console.log(err)
    }
}
exports.getUsers=async (req, res, next)=>{
    try{
        const users=await User.find().select("-password")
        const noOfRecords=users.length
        res.status(200).json({
            success:true,
            message:"Users List",
            data:users,
            noOfRecords:noOfRecords
        })
    }catch(err){
        res.status(500).json({
            success:false,
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
            res.status(404).json({success:false, message:"User not found", data:null})
        }
        res.status(200).json({success:true, message:'User fetched successfully', data:user})
    }catch(err){
        res.status(404).json({success:false, message:'Failed to fetch User', error:err})
    }
}