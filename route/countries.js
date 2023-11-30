const {getCountries, getCountry}=require("../controller/countries")
const router=require("express").Router()
router.get('/', getCountries)
router.get("/:id", getCountry)
module.exports=router