import express from 'express'
import { getAllBlogs,addBlog,updateBlog,getBlogById,deleteBlog,getByUserId } from '../controllers/blog-controller.js'

import multer from "multer";
import { checkIsUserAuthenticated } from '../middelwares/authMiddleware.js';

///////////////////////////
const storage= multer.diskStorage({
  destination:function(req, res, cb){
    cb(null, 'public/uploads/')
  },
  filename:function(req, file, cb){
    cb(null, `${Date.now()}-${file.originalname}`);
  },
})
const upload= multer({storage:storage})
////////////////////////////////

const blogrouter= express.Router()

/////////////////////////////

blogrouter.get('/',checkIsUserAuthenticated,getAllBlogs)
blogrouter.post('/add',checkIsUserAuthenticated,upload.single("image"),addBlog)
blogrouter.put('/update/:id',checkIsUserAuthenticated,upload.single("image"),updateBlog)
blogrouter.get('/:id',checkIsUserAuthenticated,getBlogById)
blogrouter.delete('/delete/:id',checkIsUserAuthenticated,deleteBlog)
blogrouter.get("/user/:id",checkIsUserAuthenticated, getByUserId);

export default blogrouter;