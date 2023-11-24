const User=require("../model/User")
exports.getUsers=async (req, res, next)=>{
    let user=new User({name:"User 1"})
    try{
        user=await user.save()
        console.log(user, "============")
        res.status(200).json({success:true})
    }catch(err){
        console.log(err)
    }
}