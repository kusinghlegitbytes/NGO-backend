const jwt=require("jsonwebtoken")
exports.generateToken=(payload)=>{
    token=jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' })
    console.log("token", token)
    return token
}
exports.verifyToken=(token)=>{

}