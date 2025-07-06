import genToken from "../config/token.js";
import admin from "../models/Admin.js";
import bcrypt from 'bcrypt'



export const SignUp = async (req,res) =>{
    try{
      const {username,email,password} = req.body;
    if(!username || !email || !password){
      return res.json({ success: false,message: "All fields are required"})
    }
    const findWithEmail = await admin.findOne({email});
    if(findWithEmail){
       return res.json({ success: false,message: "Email Already exists"})
    }
    const hashPassword = await bcrypt.hash(password,10);

    const user = admin.create(
     { username,
      email,
      password:hashPassword,}

    )

    const token = await genToken(user._id);
    res.cookie("token",token,{
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    })


    if(user){
       return res.json({ success: true,message: "account created successfully"});
    }else{
       return res.json({ success: true,message: "Error not created account"});
    }
    }
    catch(err){
       return res.json({ success: true,message: err.message});
    }

}


export const Login  = async (req,res)=>{
  try{
    const {email,password } = req.body;
   if(!email || !password){
      return res.json({ success: false,message: "All fields are required"})
    }

    const user = await admin.findOne({email});
    if(user){
      const checkpassword =await bcrypt.compare(password,user.password);
      if(checkpassword){
         const token = await genToken(user._id);
         res.cookie("token",token,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
            secure: false,
         })
         return res.json({ success: true,message:user});
      }else{
         return res.json({ success: false,message: "password incorrect"});
      }

    }
    else{
      return res.json({ success: false,message: "email incorrect"});
   }
}
catch(error){
     return res.json({ success: false,message: error.message});  
  }
}

export const Logout =async (req,res) =>{
  try{
     await  res.clearCookie("token");
      return res.json({success:true,message:"Logout successfully"})
  }
  catch(error){
     return res.json({success:false,message:"Logout error"})
  }
}