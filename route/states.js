const router=require("express").Router()
const {getStates, getState, getStatesByCountry}=require("../controller/states")
router.get('/', getStates)
router.get("/:countryCode/:stateCode", getState)
router.get("/:countryCode", getStatesByCountry)
module.exports=router