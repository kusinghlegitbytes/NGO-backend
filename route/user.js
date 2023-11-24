const router=require("express").Router()
const {getUsers}=require("../controller/user")
router.get("/", getUsers)
module.exports=router