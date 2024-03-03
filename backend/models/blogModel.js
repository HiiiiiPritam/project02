import mongoose from "mongoose";


const blogSchema= new mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  description:{
    type:String,
    required: true,
  },
  image:{
    type:String,
    required: true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
  },

})

export default mongoose.model("Blog",blogSchema)