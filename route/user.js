const router=require("express").Router()
const {getUsers, getUser, createUser, updateUser, deleteUser, loginUser}=require("../controller/user")
router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", createUser)
router.post("/login", loginUser)
// router.put("/:id", updateUser)
// router.delete("/:id", deleteUser)
module.exports=router