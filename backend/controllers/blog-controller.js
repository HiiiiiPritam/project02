import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
/////////////////////////
export const getAllBlogs= async (req, res, next)=>{
  let blogs;
  try {
    blogs= await Blog.find().populate("user");

  } catch (error) {
   return  console.log(err);
  }

  if(!blogs){
    return res.status(400).json({message:"No Blogs Found"})
  }
  return res.status(200).json({blogs})
}
////////////////////////////

export const addBlog = async (req, res, next) => {
  const { title, description,category } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findById(req.user._id);
    if (!existingUser) {
      return res.status(400).json({ message: "Unable to find user with this ID" });
    }

    // Create a new blog instance
    const blog = new Blog({
      title,
      description,
      category,
      image:req.file.filename,
      user:req.user._id,
    });

    // Save the blog
    await blog.save();

    // Update the user's blogs array
    existingUser.blogs.push(blog);
    await existingUser.save();

    // Return the blog data
    return res.status(200).json({message:"blog added successfully", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
///////////////////

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;

  try {
    let updateFields = { title, description };

    if (req.file) {
      updateFields.image = req.file.filename;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateFields, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({message:"Blog updated Successfully", blog: updatedBlog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

////////////////

export const getBlogById=async (req, res, next)=>{
  let blog;
  let id= req.params.id
  try {
    blog= await Blog.findById(id).populate("category");

  } catch (error) {
   return  console.log(error);
  }

  if(!blog){
    return res.status(400).json({message:"No Blogs Found with this id"})
  }
  return res.status(200).json({blog})
}

////////////////////////

export const deleteBlog= async (req, res, next)=>{
    let id=req.params.id;
    let blog;
    try {
      blog = await Blog.findByIdAndDelete(id).populate("user");
      await blog.user.blogs.pull(blog)
      await blog.user.save()
    } catch (error) {
      console.log(error);
    }
    if(!blog){
      return res.status(400).json({message:"failed to delete blog"})
    }
    return res.json({message:"deleted successfully"})
}

///////////////////////
export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userBlogs });
};