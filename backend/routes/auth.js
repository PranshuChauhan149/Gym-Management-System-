import express from 'express'
import { Login, Logout, SignUp } from '../controllers/Auth.js';


const AdminRouter = express.Router();

AdminRouter.post("/signup",SignUp)
AdminRouter.post("/login",Login)
AdminRouter.post("/logout",Logout)

export default AdminRouter;