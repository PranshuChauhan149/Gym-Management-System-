import express from 'express'
import { Login, Logout, SignUp } from '../controllers/Auth.js';
import { upload } from '../middleware/multer.js';


const UserRouter = express.Router();

UserRouter.get("/add",isAuth,upload.single("image"),addMember)

export default UserRouter;