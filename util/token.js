const jwt=require("jsonwebtoken")
exports.generateToken=(payload)=>{
    token=jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' })
    console.log("token", token)
    return token
}
exports.verifyToken=(token)=>{
    return new Promise((resolve, reject)=>{
        let accessToken=token.split(" ")[1]
        jwt.verify(accessToken, process.env.TOKEN_SECRET, function(err, decoded){
            if(err){
                reject({status:false, error:err.message})
            }
            if(decoded){
                resolve(decoded)
            }
        }) 
    })
}