import jwt from "jsonwebtoken";

export const verifyUser=(req,res,next)=>{
    try{
       const token=req.headers.authorization.split(" ")[1];
       if(!token){
        res.send(401).json({message:"You are unauthorized"});
       }
       jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
          return res.status(401).json({ message: "Token is not valid" });
        }
        req.user=user;
        next();
       })
    }
    catch(err){
        res.send(500).json({message:"Internal Server Error"})
    }
}