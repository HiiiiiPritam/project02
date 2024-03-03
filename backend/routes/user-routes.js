import express from "express"
import { getAllUsers,signUpUser,login,uploadProfilePicture,updateAboutText,getUserProfile,getUserByID } from "../controllers/user-controller.js";
import { checkIsUserAuthenticated } from "../middelwares/authMiddleware.js";
import multer from "multer";

const router= express.Router()
const storage= multer.diskStorage({
  destination:function(req, res, cb){
    cb(null, 'public/uploads/')
  },
  filename:function(req, file, cb){
    cb(null, `${Date.now()}-${file.originalname}`);
  },
})
const upload= multer({storage:storage})


router.get('/',checkIsUserAuthenticated,getAllUsers)
router.post('/signup',signUpUser)
router.post('/login',login)
router.put('/profilepic',checkIsUserAuthenticated,upload.single("profilePic"),uploadProfilePicture)
router.put('/about',checkIsUserAuthenticated,updateAboutText);
router.get('/profile', checkIsUserAuthenticated,getUserProfile)
router.get('/:id',checkIsUserAuthenticated,getUserByID)


export default router;