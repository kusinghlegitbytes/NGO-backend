const {verifyToken}=require("../util/token")
exports.isAuth= async (req, res, next)=>{
    const token=req.header("Authorization")
    try {
        const result = await verifyToken(token);
        req.userID=result.id
        console.log(result, "====")
        next()
    } catch (err) {
        if(err.error==="jwt expired"){
            return res.status(403).json({ status: false, error: err.error, message:"Unauthorized Access" })
        }
        return res.status(500).json({ status: false, error: err, message:"Internal Server Error" });
    }
}