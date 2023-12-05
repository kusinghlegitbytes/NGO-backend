const {isAuth}=require("../middleware/isAuth")
const router=require("express").Router()
const upload = require('multer')();
const {getNGOs, getNGO, createNGO, updateNGO, deleteNGO, getNGOsByUser}=require("../controller/organization")
router.get("/", getNGOs)
router.get("/:id", getNGO)
router.post("/", isAuth, upload.any(), createNGO)
router.put("/:id", isAuth, updateNGO)
router.delete("/:id", isAuth, deleteNGO)
router.get("/ngos-by-user/:id", isAuth, getNGOsByUser)
module.exports=router