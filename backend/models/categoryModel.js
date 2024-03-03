import mongoose from "mongoose";



const userSchema= new mongoose.Schema({
  title:{
    type:String,
    required:true
  }
})


export default mongoose.model("Category", userSchema)