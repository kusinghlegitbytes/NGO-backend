const mongoose=require("mongoose")
const ngoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String, 
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
    phone:{
        type:Number,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})
const Organization=mongoose.model('ngo', ngoSchema)
module.exports=Organization