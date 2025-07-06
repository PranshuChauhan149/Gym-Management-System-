import mongoose from "mongoose";

const connectDb = async () =>{
  try{
    const res = await mongoose.connect(process.env.MONGOOSE_URL);
    if(res){
      console.log("connected susseccfully !!")
    }
  }
  catch(error){
    console.log(error);
  }
}

export default connectDb;