import categoryModel from "../models/categoryModel.js";

export const getAllCategories= async(req, res)=>{
  try {
    let categories=await categoryModel.find({})

    return res.status(200).json(categories)
  
  } catch (error) {
    res.status(400).json({message:"Something went wrong in finding all categories"})
  }
}

export const addNewCategory= async(req, res)=>{
  const {title}= req.body;
  try {
    if (title) {
      const newCategory= new categoryModel({
        title
      });
      const savedChanges= await newCategory.save();
      if(savedChanges){
        return res.status(200).json({message:"category added successfully"})
      } 
    } else {
      res.status(400).json({message:"couldnot save the category"})
    }
  } catch (error) {
    res.status(400).json({message:"Something went wrong in addaing the categories"})
  }

}