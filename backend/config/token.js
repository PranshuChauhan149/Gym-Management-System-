import jwt from 'jsonwebtoken'

const genToken = async (userid)=>{

try{
  const token = await jwt.sign({id:userid},process.env.TOKEN_SCRET,{expiresIn:"7d"})
  return token;

}
catch(error){
   console.log("Token Error");
}

}

export default genToken;