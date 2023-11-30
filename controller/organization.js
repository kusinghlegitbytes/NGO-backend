const Organization=require("../model/Organization")
exports.getNGOs=async (req, res, next)=>{
    try{
        const ngos=await Organization.find()
        const noOfRecords=ngos.length
        console.log(ngos)
        console.log(noOfRecords)
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
    const email=req.body.email
    const phone=req.body.phone
    const address=req.body.address
    const description=req.body.description
    const name=req.body.name
    const image=req.files[0]
    try{
        const imageBuffer = image.buffer;
        let organization=new Organization({name, email, phone, address, description, image:imageBuffer})
        organization=await organization.save() 
        const data={
            name:organization.name,
            email:organization.email,
            phone:organization.phone,
            address:organization.address,
            description:organization.description,
            image:organization.image.toString('base64')
        }
        res.status(200).json({success:true, message:'NGO created successfully', data:data})
    }catch(err){
        console.log(err.code)
        if(err.code===11000){
            return res.status(409).json({success:false, message:'NGO already registered with us', error:"Failed to create"})
        }
        return res.status(500).json({success:false, message:"Internal Server Error", error:err})
        
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