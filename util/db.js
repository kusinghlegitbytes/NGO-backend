const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        const uri=`${process.env.DB_URL}/${process.env.DB_NAME}`
        await mongoose.connect(process.env.DB_ATLAS)
        console.log("database connected")
    }catch(err){
        console.log(`Error in connecting data: ${err}`)
    }
}
module.exports=connectDB