let State = require('country-state-city').State;
exports.getStates=async (req, res, next)=>{
    try{
        const statesList=State.getAllStates()
        res.status(200).json({status:true, message:"states fetched successfully", data:statesList, noOfRecords:statesList.length})
    }catch(err){
        res.status(500).json({status:false, message:"Internal Server Error", error:err})
    }
}
exports.getState=async (req, res, next)=>{
    try{
        const stateCode=req.params.stateCode
        const countryCode=req.params.countryCode
        const state=State.getStateByCodeAndCountry(stateCode, countryCode)
        if(!state){
            return res.status(404).json({status:false, message:"State not found", data:null})
        }
        res.status(200).json({status:true, message:'State fetched successfully', data:state})
    }catch(err){
        res.status(500).json({status:false, message:'Internal server error', error:err})
    }
}
exports.getStatesByCountry=async (req, res, next)=>{
    try{
        console.log(req.params)
        const countryCode=req.params.countryCode
        const states=State.getStatesOfCountry(countryCode)
        res.status(200).json({status:true, message:'States fetched successfully', data:states})
    }catch(err){
        res.status(500).json({status:false, message:'Internal server error', error:err})
    }
}