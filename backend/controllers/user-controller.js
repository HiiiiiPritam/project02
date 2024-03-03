import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//////////////////////
export let getAllUsers= async (req, res, next)=>{

  let users;
  try {
    users= await userModel.find({})

  } catch (error) {
    console.log(error);
    res.status(400).json({message:"Failed to load users"})
  }

  if(!users){
    return res.status(404).json({message:"No Users Found"})
  }
  return res.json({users})
}

//////////////////////////////

export let signUpUser = async (req, res) => {
  let { name, email, password } = req.body;
  let existingUser;


  try {
    existingUser = await userModel.findOne({ email });
  } catch (error) {
    console.log("Error finding existing user:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = bcrypt.hashSync(password, salt);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      blogs: []
    });
    await user.save();
    console.log('User registered successfully:', user);
    return res.json({message:"user registered successfully", user });
  } catch (error) {
    console.log('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

////////////////////////////

export let login= async (req, res)=>{
  let {email, password}= req.body;

 try {
  let user=await userModel.findOne({email})

  if(!user){
    return res.status(400).json({message:"couldnot find user with this email"})
  }
  
  let isPasswordValid= await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({message:"Invalid Password"})
  }

  const token = jwt.sign({ userID: user.id }, "gulugulu", {
    expiresIn: "2d"
  });
  
  return res.status(200).json({
    message: "Login successful",
    userID:user._id,
    token,
    name: user.name
  });
 } catch (error) {
  console.log(console.error);
  return res.status(500).json({ message: "Internal server error in login controller" });
 }
}
////////////////////////
export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await userModel.findByIdAndUpdate(userId, { profilePic: req.file.filename }, { new: true });
    res.status(200).json({ message: 'Profile picture uploaded successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload profile picture', error: error.message });
  }
};

//////////////////////
export const updateAboutText = async (req, res) => {
  try {
    const userId = req.user._id;
    const { about } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(userId, { about }, { new: true });
    res.status(200).json({ message: 'About text updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update about text', error: error.message });
  }
};
//////////////////////
export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate('blogs'); // Assuming the user schema has a 'blogs' field

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  }
};
///////////////////////////////////

export const getUserByID=async ( req, res)=>{
  let id=  req.params.id;
  try {
    let user= await userModel.findById(id).populate('blogs');
    if(user){
      return res.status(200).json({user})
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  }
}