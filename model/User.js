const mongoose=require("mongoose")
const bcrypt = require('bcrypt')
const saltRounds=10
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
      type:String,
      enum:["admin", "vendor"],
      default:"vendor"
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }
})
userSchema.pre("save", function(next){
    let user=this
    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){
                return next(err)
            }
            user.password=hash 
            next()
        })
    })
})
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
const User=mongoose.model('user', userSchema)
module.exports=User