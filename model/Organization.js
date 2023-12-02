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
        required:true,
        unique:true
    }, 
    phone:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    views:{
        type:Number,
        default:0
    }
})
const Organization=mongoose.model('ngo', ngoSchema)
module.exports=Organization