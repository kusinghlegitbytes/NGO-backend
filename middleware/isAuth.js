const {verifyToken}=require("../util/token")
exports.isAuth= async (req, res, next)=>{
    const token=req.header("Authorization")
    try {
        const result = await verifyToken(token);
        req.userID=result.id
        next()
    } catch (err) {
        return res.status(500).json({ success: err.status, error: 'Not Authorized', message:"Unauthorized Access" });
    }
}