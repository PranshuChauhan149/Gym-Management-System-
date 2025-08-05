import jwt from 'jsonwebtoken'

 const getCurrentuser = async (req,res,next) =>{
 try{
   const token = req?.cookies?.token;
  if(!token){
    return res.json({success:false,message:"User Not Login"})
  }
  else{
    const dedoded =await jwt.verify(token,process.env.TOKEN_SCRET);
    req.userid = dedoded.id;
    next();
  }
 }
 catch(error){
   return res.status(401).json({ success: false, message: "Invalid token" });
 }
}

export default getCurrentuser;
