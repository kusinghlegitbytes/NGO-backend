let MyCountry = require('country-state-city').Country;
exports.getCountries=async (req, res, next)=>{
    try{
        const countriesList=MyCountry.getAllCountries()
        res.status(200).json({status:true, message:"Countries fetched successfully", data:countriesList, noOfRecords:countriesList.length})
    }catch(err){
        res.status(500).json({status:false, message:"Internal Server Error", error:err})
    }
}
exports.getCountry=async (req, res, next)=>{
    try{
        const id=req.params.id
        const country=MyCountry.getCountryByCode(id)
        if(!country){
            return res.status(404).json({status:false, message:"Country not found", data:null})
        }
        res.status(200).json({status:true, message:'Country fetched successfully', data:country})
    }catch(err){
        res.status(500).json({status:false, message:'Internal server error', error:err})
    }
}