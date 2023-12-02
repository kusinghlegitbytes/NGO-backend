const Organization=require("../model/Organization")
exports.getNGOs=async (req, res, next)=>{
    try{
        const ngos=await Organization.find().populate('user')
        const noOfRecords=ngos.length
        console.log(ngos)
        console.log(noOfRecords)
        res.status(200).json({
            status:true,
            message:"NGOs List",
            data:ngos,
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
exports.getNGO= async (req, res, next)=>{
    try{
        const id=req.params.id
        let organization=await Organization.findById(id)
        if(!organization){
            res.status(404).json({status:false, message:"NGO not found", data:null})
        }
        res.status(200).json({status:true, message:'NGO fetched successfully', data:organization})
    }catch(err){
        res.status(404).json({status:false, message:'Failed to fetch NGO', error:err})
    }
}
exports.createNGO= async (req, res, next)=>{
    const email=req.body.email
    const phone=req.body.phone
    const address=req.body.address
    const description=req.body.description
    const name=req.body.name
    const user=req.userID
    try{
        let organization=new Organization({name, email, phone, address, description, user})
        organization=await organization.save() 
        res.status(200).json({status:true, message:'NGO created successfully', data:organization})
    }catch(err){
        console.log(err.code)
        if(err.code===11000){
            return res.status(409).json({status:false, message:'Phone number and email already registered', error:"Already registered"})
        }
        return res.status(500).json({status:false, message:"Internal Server Error", error:err})
    }
}
exports.updateNGO=async (req, res, next)=>{
    try{
        const id=req.params.id
        let data=req.body
        const user=req.userID
        data={...data, user:user}
        const updatedNGO=await Organization.findByIdAndUpdate(id, data, {new:true})
        return res.status(200).json({status:true, message:"NGO updated successfully", data:updatedNGO})
    }catch(err){
        return res.status(500).json({status:false, message:"Failed to update", error:"Internal server error"})
    }
}
exports.deleteNGO=async (req, res, next)=>{
    try{
       const id=req.params.id
       const result=await Organization.findByIdAndDelete(id)
       console.log(result, "=========")
       if(!result){
        return res.status(404).json({status:false, message:"NGO does not exist", error:"Failed to delete"})
       }
       return res.status(200).json({status:true, message:"NGO deleted successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).json({status:false, error:"Failed to delete", message:"Internal server error"})
    }
}