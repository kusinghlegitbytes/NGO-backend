const Organization=require("../model/Organization")
exports.getNGOs=async (req, res, next)=>{
    try{
        const ngos=await Organization.find()
        const noOfRecords=ngos.length
        res.status(200).json({
            success:true,
            message:"NGOs List",
            data:ngos,
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
exports.getNGO= async (req, res, next)=>{
    try{
        const id=req.params.id
        let organization=await Organization.findById(id)
        if(!organization){
            res.status(404).json({success:false, message:"NGO not found", data:null})
        }
        res.status(200).json({success:true, message:'NGO fetched successfully', data:organization})
    }catch(err){
        res.status(404).json({success:false, message:'Failed to fetch NGO', error:err})
    }
}
exports.createNGO= async (req, res, next)=>{
    try{
        const existingNGO=await Organization.findOne({email:req.body.email})
        if(existingNGO){
            return res.status(400).json({success:false, error:'Failed to create', message:"NGO already registered"})
        }
        let organization=new Organization(req.body)
        organization=await organization.save() 
        res.status(200).json({success:true, message:'NGO created successfully', data:organization})
    }catch(err){
        res.status(424).json({success:false, message:'Failed to create NGO', error:err})
    }
}
exports.updateNGO=(req, res, next)=>{
    try{
        const id=req.params.id
        const data=req.body
    }catch(err){
        
    }
}
exports.deleteNGO=(req, res, next)=>{
    try{

    }catch(err){
        
    }
}