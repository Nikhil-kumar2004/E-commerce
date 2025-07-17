import jwt from 'jsonwebtoken'

const userAuth=async (req,res,next)=>{
    try{
        const {token}=req.headers;
        if(!token){
            return res.status(403).json({success:false, msg:"Please Login"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=token_decode.id //req.body is not defined in GET request.
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({success:false, msg:error.message})
    }
}

export default userAuth