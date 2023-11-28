const router=require("express").Router()
const {getNGOs, getNGO, createNGO, updateNGO, deleteNGO}=require("../controller/organization")
router.get("/", getNGOs)
router.get("/:id", getNGO)
router.post("/", createNGO)
router.put("/:id", updateNGO)
router.delete("/:id", deleteNGO)
module.exports=router