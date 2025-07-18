import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true
  },

},{timestamps:true})

const admin = mongoose.model("auth",adminSchema);
export default admin;