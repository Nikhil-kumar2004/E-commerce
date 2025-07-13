import jwt from 'jsonwebtoken'

const adminAuth=async (req,res,next)=>{
    try{
        const {token}=req.headers;
        if(!token){
            return res.status(403).json({success:false, msg:"Not Authorized Login Again"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        
        if(token_decode.id!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(403).json({success:false, msg:"Not Authorized as Admin"})
        }
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({success:false, msg:error.message})
    }
}

export default adminAuth