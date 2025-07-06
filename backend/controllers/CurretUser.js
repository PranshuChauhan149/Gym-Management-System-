import admin from "../models/Admin.js";


export const currentUser = async (req,res)=>{
  try{

    const userid = req.userid;
    console.log(userid);
  const user = await admin.findById(userid).select("-password");
  if(!user){
    return res.json({success:false,message:"User Not Login"})
  }
  else{
      return res.json({success:true,user})
    }
  }
  catch(error){
     return res.json({success:false,message:"currentUser Error"})
  }
}