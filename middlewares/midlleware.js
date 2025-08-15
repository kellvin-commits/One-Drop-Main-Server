const jwt=require('jsonwebtoken');
const verifyUser=async(req,res,next)=>{
    const authHeader=req.headers[authorization];
    const token=authHeader && authHeader.split(" ")[0];
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Token not found!'
        })
    }
    
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
module.exports=verifyUser;