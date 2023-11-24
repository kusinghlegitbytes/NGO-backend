const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        const uri=`${process.env.DB_URL}/${process.env.DB_NAME}`
        mongoose.connect(uri)
        console.log("database connected")
    }catch(err){
        console.log(`Error in connecting data: ${err}`)
    }
}
module.exports=connectDB
