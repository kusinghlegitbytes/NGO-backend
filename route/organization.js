const {isAuth}=require("../middleware/isAuth")
const router=require("express").Router()
const upload = require('multer')();
const {getNGOs, getNGO, createNGO, updateNGO, deleteNGO}=require("../controller/organization")
router.get("/", getNGOs)
router.get("/:id", getNGO)
router.post("/", isAuth, upload.any(), createNGO)
router.put("/:id", updateNGO)
router.delete("/:id", deleteNGO)
module.exports=router